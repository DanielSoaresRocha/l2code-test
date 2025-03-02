import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNgxMask()],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ]),
      telefone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ]),
      favorito: new FormControl(false),
      ativo: new FormControl(true),
      dateCadastro: new FormControl(null),
    });
  }

  save() {
    if (this.registerForm.invalid) {
      alert('Preencha corretamente o formulário');
      return;
    }
    this.contactsService.save(this.registerForm.getRawValue());
    alert(`${this.nome.value} foi salvo com sucesso!`);
    this.registerForm.reset();
  }

  getContacts() {
    return this.contactsService.getData();
  }

  get nome() {
    return this.registerForm.controls['nome'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get celular() {
    return this.registerForm.controls['celular'];
  }
  get telefone() {
    return this.registerForm.controls['telefone'];
  }
}
