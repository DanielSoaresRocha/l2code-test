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
    this.getAllContacts();

    this.createForm();
  }

  getAllContacts() {
    this.contactService.getAll().subscribe((response) => {
      this.contacts = response;
      this.contactsFilter = this.contacts;
    });
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
      favorito: new FormControl(null),
      ativo: new FormControl(null),
      dateCadastro: new FormControl(null),
    });
  }

  deleteContact(contact: Contact) {
    this.contactService.delete(contact.id).subscribe(() => this.reset());
  }

  favoriteContact(contact: Contact) {
    contact = {
      ...contact,
      favorito: contact.favorito == 'S' ? 'N' : 'S',
    };

    this.contactService.put(contact).subscribe(() => this.reset());
  }

  inactiveContact(contact: Contact) {
    contact = {
      ...contact,
      ativo: contact.ativo == 'S' ? 'N' : 'S',
    };

    this.contactService.put(contact).subscribe(() => this.reset());
  }

  reset() {
    this.getAllContacts();
    this.filterForm.reset();
  }

  updateContact(id: number) {
    this.router.navigate(['contacts/register'], {
      queryParams: { id: id },
    });
  }

  filter() {
    let contactFilter: Contact = {
      ...this.filterForm.getRawValue(),
      favorito: this.favorito.value == true ? 'S' : null,
      ativo: this.ativo.value == true ? 'N' : null,
    };

    this.contactService.getByFilter(contactFilter).subscribe({
      next: (response) => {
        this.contacts = response;
        this.contactsFilter = response;
      },
      error: (e: HttpErrorResponse) => alert(e.error.message),
    });
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
