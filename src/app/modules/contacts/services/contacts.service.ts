import { Injectable } from '@angular/core';
import { Contact } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private storageKey = 'contacts';

  constructor() {}

  save(dado: any): void {
    const dados = this.getData();
    dados.push(dado);
    localStorage.setItem(this.storageKey, JSON.stringify(dados));
  }

  getData(): Contact[] {
    const dados = localStorage.getItem(this.storageKey);
    return dados ? JSON.parse(dados) : [];
  }

  delete(contact: Contact): void {
    const index = this.getData().findIndex((c) => c.celular == contact.celular);
    const dados = this.getData();

    dados.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(dados));
  }

  update(contact: Contact): void {
    const dados = this.getData();
    const index = dados.findIndex((c) => c.celular === contact.celular);

    if (index !== -1) {
      dados[index] = contact;
      localStorage.setItem(this.storageKey, JSON.stringify(dados));
    }
  }

  cleanAll(): void {
    localStorage.removeItem(this.storageKey);
  }
}
