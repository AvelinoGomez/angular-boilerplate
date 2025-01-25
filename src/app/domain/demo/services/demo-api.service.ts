import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

export abstract class DemoApiService {
  abstract getInfo(): Observable<any>
}

@Injectable({
  providedIn: 'root'
})
export class ImplDemoApiService implements DemoApiService {

  constructor(private http: HttpClient) {}
  getInfo(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/demo`);
  }

}

@Injectable({
  providedIn: 'root'
})
export class MockDemoApiService implements DemoApiService {

  getInfo(): Observable<any> {
    return of([{ message: `Mensagem mockada sem consulta ao backend` }]); 
  }

}
