import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})


export class ContactService {
  private contactUrl = `${environment.baseUrl}/contatos`;

  constructor(private httpClient: HttpClient) {}

  contactRegister(contact: IContact) {
    return this.httpClient.post<IContact>(this.contactUrl, contact);
  }

  contactUpdate(contact: IContact) {
    return this.httpClient.put<IContact>(
      `${this.contactUrl}/${contact.id}`,
      contact
    );
  }

  getContacts(id: number) {
    return this.httpClient.get<IContact[]>(`${this.contactUrl}/pessoa/${id}`);
  }



  contactDelete(id: number) {
    return this.httpClient.delete<void>(`${this.contactUrl}/${id}`);
  }
}
