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

  remove(index: number): void {
    const dados = this.getData();
    dados.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(dados));
  }

  cleanAll(): void {
    localStorage.removeItem(this.storageKey);
  }
}
