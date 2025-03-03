import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormateDatePipe } from '../../../../shared/pipe/formate-date.pipe';
import { PhoneNumberPipe } from '../../../../shared/pipe/phone-number.pipe';
import { Contact } from '../../model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormateDatePipe, PhoneNumberPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  contacts!: Contact[];

  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getData();
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
    this.contacts = this.contactService.getData();
  }

  inactiveContact(contact: Contact) {
    contact = {
      ...contact,
      ativo: !contact.ativo,
    };

    this.contactService.update(contact);
    this.contacts = this.contactService.getData();
  }

  updateContact(phoneNumber: number) {
    this.router.navigate(['contacts/register'], {
      queryParams: { phoneNumber: phoneNumber },
    });
  }

  goToRegister() {
    this.router.navigate(['contacts/register']);
  }
}
