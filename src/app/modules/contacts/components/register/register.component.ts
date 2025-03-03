import { CommonModule } from '@angular/common';
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
  phoneNumber = '';

  constructor(
    private contactsService: ContactsService,
    private phoneNumberPipe: PhoneNumberPipe,
    private route: ActivatedRoute
  ) {
    const number = this.route.snapshot.queryParamMap.get('phoneNumber');
    this.phoneNumber = number ? number : '';
    console.log('Query Param:', this.phoneNumber);
  }

  ngOnInit(): void {
    this.createForm();
    if (this.phoneNumber) {
      this.getContactByPhoneNumber(Number(this.phoneNumber));
    }
  }

  getContactByPhoneNumber(phoneNumber: number) {
    let contact = this.contactsService
      .getData()
      .find((c) => c.celular == phoneNumber);

    if (!contact) return;

    this.nome.setValue(contact.nome);
    this.email.setValue(contact.email);
    this.celular.setValue(contact.celular);
    this.telefone.setValue(contact.telefone);
    this.dateCadastro.setValue(contact.dateCadastro);
    this.favorito.setValue(contact.favorito);
    this.ativo.setValue(contact.ativo);
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

    if (
      !this.phoneNumber &&
      this.contactsService
        .getData()
        .find((contact) => contact.celular == this.celular.value)
    ) {
      alert(
        `O número de celular ${this.phoneNumberPipe.transform(
          this.celular.value
        )} já foi adicionado.`
      );
      return;
    }

    if (this.phoneNumber) {
      this.contactsService.update(this.registerForm.getRawValue());
    } else {
      this.dateCadastro.setValue(new Date());
      this.contactsService.save(this.registerForm.getRawValue());
    }
    alert(`${this.nome.value} foi salvo com sucesso!`);

    this.reset();
  }

  reset() {
    this.registerForm.reset();
    this.ativo.setValue(true);
    this.favorito.setValue(false);
    this.phoneNumber = '';
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
  get dateCadastro() {
    return this.registerForm.controls['dateCadastro'];
  }
  get ativo() {
    return this.registerForm.controls['ativo'];
  }
  get favorito() {
    return this.registerForm.controls['favorito'];
  }
}
