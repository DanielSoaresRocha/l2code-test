import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { Contact } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private storageKey = 'contacts';

  constructor(private httpClient: HttpClient) {}

  save(dado: any): void {
    const dados = this.getData();
    dados.push(dado);
    localStorage.setItem(this.storageKey, JSON.stringify(dados));
  }

  getData(): Contact[] {
    const dados = localStorage.getItem(this.storageKey);
    return dados ? JSON.parse(dados) : [];
  }

  getById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${env.baseUrl}contatos/${id}`);
  }

  getContatos(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${env.baseUrl}contatos`);
  }

  putContato(contato: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(
      `${env.baseUrl}contatos/${contato.id}`,
      contato
    );
  }

  postContato(contato: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${env.baseUrl}contatos`, contato);
  }

  deleteContato(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${env.baseUrl}contatos/${id}`);
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
