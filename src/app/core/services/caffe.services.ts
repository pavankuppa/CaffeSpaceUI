import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateItem } from '../interfaces/caffe_interace';
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

    createOrders(params: any): Promise<any> {
        return this.http.post(`${API_URL}/orders.json`, params).toPromise()
    }

    createOffers(params: any): Promise<any>{
        return this.http.post(`${API_URL}/offers.json`, params).toPromise()
    }

    createItems(params: any): Promise<any>{
        return this.http.post(`${API_URL}/items.json`, params).toPromise()
    }
}
