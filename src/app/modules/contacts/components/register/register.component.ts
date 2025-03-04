import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PhoneNumberPipe } from '../../../../shared/pipe/phone-number.pipe';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNgxMask(), PhoneNumberPipe],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private contactsService: ContactsService,
    private phoneNumberPipe: PhoneNumberPipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.getContactByPhoneNumber();
  }

  getContactByPhoneNumber() {
    const number = this.route.snapshot.queryParamMap.get('id');
    this.id.setValue(number ? number : '');

    if (!number) return;

    this.contactsService.getById(Number(number)).subscribe((response) => {
      if (!response) return;

      this.nome.setValue(response.nome);
      this.email.setValue(response.email);
      this.celular.setValue(response.celular);
      this.telefone.setValue(response.telefone);
      this.favorito.setValue(response.favorito);
      this.ativo.setValue(response.ativo);
    });
  }

  createForm() {
    this.registerForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ]),
      telefone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      favorito: new FormControl('N'),
      ativo: new FormControl('S'),
    });
  }

  save() {
    if (this.registerForm.invalid) {
      alert('Preencha corretamente o formulário');
      return;
    }

    if (this.id.value) {
      this.contactsService
        .put(this.registerForm.getRawValue())
        .subscribe(() => {
          alert(`${this.nome.value} foi salvo com sucesso!`);
          this.reset();
        });
    } else {
      this.contactsService.post(this.registerForm.getRawValue()).subscribe({
        next: () => {
          alert(`${this.nome.value} foi salvo com sucesso!`);
          this.reset();
        },
        error: (e: HttpErrorResponse) => alert(e.error.message),
      });
    }
  }

  reset() {
    this.registerForm.reset();
    this.ativo.setValue('S');
    this.favorito.setValue('N');
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
  get ativo() {
    return this.registerForm.controls['ativo'];
  }
  get favorito() {
    return this.registerForm.controls['favorito'];
  }
  get id() {
    return this.registerForm.controls['id'];
  }
}
