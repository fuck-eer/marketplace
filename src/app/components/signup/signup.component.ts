import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name: string = '';
  password: string = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  onSignup() {
    this.authService.onSignup(this.name, this.password);
    console.log('SignupComponent signup');
  }
}
