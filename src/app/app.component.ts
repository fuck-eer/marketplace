import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { interval } from 'rxjs';
import { SigninComponent } from './components/signin/signin.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MarketPlace';
  showLogout = false;
  userName = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.authService.checkAuthenticated().subscribe((authenticated) => {
      this.showLogout = authenticated;
    });
    this.authService.getUserDetails().subscribe((userDetails) => {
      if (userDetails) {
        this.userName = userDetails.name;
      } else {
        this.userName = '';
      }
    });
  }
  logout() {
    this.authService.onLogout();
  }
}
