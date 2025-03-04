import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { HttpParamsBuilder } from '../../../shared/utils/HttpParamsBuilder';
import { Contact } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${env.baseUrl}contatos/${id}`);
  }

  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${env.baseUrl}contatos`);
  }

  getByFilter(contact: Contact): Observable<Contact[]> {
    let params = new HttpParamsBuilder(contact).build();

    return this.httpClient.get<Contact[]>(`${env.baseUrl}contatos/filtrar`, {
      params: params,
    });
  }

  put(contato: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(
      `${env.baseUrl}contatos/${contato.id}`,
      contato
    );
  }

  post(contato: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${env.baseUrl}contatos`, contato);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${env.baseUrl}contatos/${id}`);
  }
}
