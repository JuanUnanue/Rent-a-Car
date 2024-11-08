import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/clients';//ACA VA EL JSON SERVER DE CLIENTES
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.getClients().pipe(
      map((clients) => {
        const nextId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
        return { ...client, id: nextId }; 
      }),
      switchMap(newClient => this.http.post<Client>(this.apiUrl, newClient))
    );
  }
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  login(email: string, password: string): Observable<Client | null> {
    return this.http.get<Client[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((clients: string | any[]) => clients.length ? clients[0] : null)
    );
  }
}