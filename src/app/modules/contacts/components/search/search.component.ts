import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormateDatePipe } from '../../../../shared/pipe/formate-date.pipe';
import { PhoneNumberPipe } from '../../../../shared/pipe/phone-number.pipe';
import { Contact } from '../../model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    CommonModule,
    FormateDatePipe,
    PhoneNumberPipe,
    UiSwitchModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [provideNgxMask()],
})
export class SearchComponent implements OnInit {
  contacts!: Contact[];
  contactsFilter!: Contact[];
  filterForm!: FormGroup;

  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getData();
    this.contactsFilter = this.contactService.getData();
    this.createForm();
  }

  createForm() {
    this.filterForm = new FormGroup({
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
      ativo: new FormControl(false),
      dateCadastro: new FormControl(null),
    });
  }

  deleteContact(contact: Contact) {
    this.contactService.delete(contact);
    this.contacts = this.contactService.getData();
  }

  favoriteContact(contact: Contact) {
    contact = {
      ...contact,
      favorito: !contact.favorito,
    };

    this.contactService.update(contact);
    this.reset();
  }

  inactiveContact(contact: Contact) {
    contact = {
      ...contact,
      ativo: !contact.ativo,
    };

    this.contactService.update(contact);
    this.reset();
  }

  reset() {
    this.contacts = this.contactService.getData();
    this.contactsFilter = this.contactService.getData();
    this.filterForm.reset();
  }

  updateContact(phoneNumber: number) {
    this.router.navigate(['contacts/register'], {
      queryParams: { phoneNumber: phoneNumber },
    });
  }

  filter() {
    this.contactsFilter = this.contacts;
    const filter: Contact = this.filterForm.getRawValue();

    if (filter.favorito)
      this.contactsFilter = this.contactsFilter.filter(
        (c) => c.favorito == true
      );

    if (filter.ativo)
      this.contactsFilter = this.contactsFilter.filter((c) => c.ativo == false);

    if (filter.nome)
      this.contactsFilter = this.contactsFilter.filter((c) =>
        c.nome.includes(filter.nome)
      );

    if (filter.email)
      this.contactsFilter = this.contactsFilter.filter((c) =>
        c.email.includes(filter.email)
      );

    if (filter.celular)
      this.contactsFilter = this.contactsFilter.filter((c) =>
        c.celular.toString().includes(filter.celular.toString())
      );
    if (filter.telefone)
      this.contactsFilter = this.contactsFilter.filter((c) =>
        c.telefone.toString().includes(filter.telefone.toString())
      );
  }

  goToRegister() {
    this.router.navigate(['contacts/register']);
  }

  get nome() {
    return this.filterForm.controls['nome'];
  }
  get email() {
    return this.filterForm.controls['email'];
  }
  get celular() {
    return this.filterForm.controls['celular'];
  }
  get telefone() {
    return this.filterForm.controls['telefone'];
  }
  get dateCadastro() {
    return this.filterForm.controls['dateCadastro'];
  }
  get ativo() {
    return this.filterForm.controls['ativo'];
  }
  get favorito() {
    return this.filterForm.controls['favorito'];
  }
}
