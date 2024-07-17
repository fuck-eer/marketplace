import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: () => CanActivateFn = () => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    let isAuthenticated = false;
    authService.checkAuthenticated().subscribe((isLoggedIn) => {
      isAuthenticated = isLoggedIn;
    });

    if (isAuthenticated) {
      console.log('>>>>authGuard authed');
      return true;
    } else {
      console.log('::::authGuard navigateed');

      // Redirect to the login page if the user is not authenticated
      router.navigate(['/signin']);
      return false;
    }
  };
};

//==============
// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     return this.checkAuth();
//   }

//   canActivateChild(): boolean {
//     return this.checkAuth();
//   }

//   canLoad(): boolean {
//     return this.checkAuth();
//   }

//   private checkAuth(): boolean {
//     if (this.authService.checkAuthenticated()) {
//       return true;
//     } else {
//       // Redirect to the login page if the user is not authenticated
//       this.router.navigate(['/signin']);
//       return false;
//     }
//   }
// }
