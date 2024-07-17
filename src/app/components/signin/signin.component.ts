import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  name: string = '';
  password: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  onSignin() {
    this.authService.onSignin(this.name, this.password);
    console.log('SigninComponent signin');
  }
}
