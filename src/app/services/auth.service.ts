import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:5000/users';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userDetails = new BehaviorSubject<User | undefined | null>(null);

  private fetchUserDetails(userId: string) {
    this.http.get<User>(`${this.apiURL}/${userId}`).subscribe((userDetails) => {
      if (!userDetails?.id && !userDetails?.name) {
        // this.isAuthenticated = false;
        this.isAuthenticated.next(false);
        this.userDetails.next(null);
      } else {
        console.log('user found');
        this.userDetails.next(userDetails);
        this.isAuthenticated.next(true);
      }
    });
  }
  constructor(private http: HttpClient, private router: Router) {
    if (!!localStorage.getItem('userId')) {
      this.isAuthenticated.next(!!localStorage.getItem('userId'));
      this.fetchUserDetails(localStorage.getItem('userId') as string);
    }
  }

  onSignup(name: string, password: string) {
    //make api call
    //set user details
    //set isAuthenticated to true
    //redirect to home page
    this.http
      .post<User>(this.apiURL, { id: uuidv4(), name, password })
      .subscribe((userDetails) => {
        this.userDetails.next(userDetails);
        this.isAuthenticated.next(true);
        localStorage.setItem('userId', userDetails.id.toString());
        this.router.navigate(['/home']);
      });
  }

  onSignin(username: string, password: string) {
    //make api call to get all user =>passes
    //set user details
    //set isAuthenticated to true
    //redirect to home page
    this.http.get<User[]>(this.apiURL).subscribe((allUsers) => {
      const foundUser = allUsers.filter(
        (user) => user.name === username && user.password === password
      )[0];
      if (!foundUser) {
        //Show Error on Home Screen ===> use some Snackbar
        this.isAuthenticated.next(false);
        this.userDetails.next(null);
        this.router.navigate(['/signin']);
      } else {
        this.userDetails.next(foundUser);
        this.isAuthenticated.next(true);
        localStorage.setItem('userId', foundUser.id.toString());
        this.router.navigate(['/home']);
      }
    });
  }

  onLogout() {
    localStorage.removeItem('userId');
    this.userDetails.next(null);
    this.isAuthenticated.next(false);
    this.router.navigate(['/signin']);
  }

  checkAuthenticated() {
    return this.isAuthenticated;
  }
  getUserDetails() {
    return this.userDetails;
  }
}
