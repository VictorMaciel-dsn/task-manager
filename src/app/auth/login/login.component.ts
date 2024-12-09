import { Component } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isRegistering: boolean = false;

  constructor(private auth: Auth) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        console.log('Login realizado com sucesso!');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erro ao realizar login:', error);
        this.errorMessage = 'E-mail ou senha inválidos.';
      });
  }

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        console.log('Usuário cadastrado com sucesso!');
        alert('Cadastro realizado! Você já pode fazer login.');
        this.isRegistering = false;
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        this.errorMessage =
          'Erro ao cadastrar usuário. Verifique os dados e tente novamente.';
      });
  }

  toggleRegisterMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }
}
