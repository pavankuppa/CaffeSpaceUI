import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const API_URL = environment.appURL;

@Injectable({ providedIn: 'root' })

export class CaffeServices {
    constructor(private http: HttpClient) { }
    getAllItems(): Observable<any>{
        return this.http.get(`${API_URL}/items.json`).pipe(map((response: any) => {
            return response;
        }));
    }

    getDiscountOffers(): Observable<any>{
        return this.http.get(`${API_URL}/offers.json?scope=discount`).pipe(map((response: any) => {
            return response;
        }));
    }

    getFreeOffers(): Observable<any>{
        return this.http.get(`${API_URL}/offers.json?scope=free`).pipe(map((response: any) => {
            return response;
        }));
    }

    getOrders(): Observable<any>{
        return this.http.get(`${API_URL}/orders.json`).pipe(map((response: any) => {
            return response;
        }));
    }

    createOrders(body: any): Promise<any> {
        return this.http.post(`${API_URL}/orders.json`, body).toPromise()
    }

    createOffers(body: any): Promise<any>{
        return this.http.post(`${API_URL}/offers.json`, body).toPromise()
    }
}
