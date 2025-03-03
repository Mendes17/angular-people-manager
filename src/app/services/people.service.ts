import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPeople } from '../interfaces/people';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private peopleUrl = `${environment.baseUrl}/pessoas`;

  constructor(private httpClient: HttpClient) {}

  getPeople() {
    return this.httpClient.get<IPeople[]>(this.peopleUrl);
  }

  getPerson(id: number) {
    return this.httpClient.get<IPeople>(`${this.peopleUrl}/${id}`);
  }

  personRegister(person: IPeople) {
    return this.httpClient.post<IPeople>(this.peopleUrl, person);
  }

  personUdpate(person: IPeople) {
    return this.httpClient.put<IPeople>(`${this.peopleUrl}/${person.id}`, person);
  }

  deletePerson(id: number) {
    return this.httpClient.delete<void>(`${this.peopleUrl}/${id}`);
  }
}
