import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule]
})
export class Login {

  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)
    ])
  });

  constructor(private router: Router) {}

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const name = this.loginForm.value.name;
    const phone = this.loginForm.value.phone;

    localStorage.setItem('customerName', name || '');
    localStorage.setItem('customerPhone', phone || '');

    this.router.navigate(['/restaurant']);
  }
}