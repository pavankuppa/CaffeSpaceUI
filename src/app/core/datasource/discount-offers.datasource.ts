import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { DiscountOffers } from "../interfaces/caffe_interace";
import { QueryResultsModel } from "../models/query-models/query-results.model";
import { CaffeServices } from "../services/caffe.services";



export class DiscountOffersDataSource implements DataSource<DiscountOffers> {

    entitySubject = new BehaviorSubject<DiscountOffers[]>([]);
    hasItems: boolean = false; // Need to show message: 'No records found
    data: DiscountOffers[];

    // Loading | Progress bar
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean>;

    constructor(private caffeServices: CaffeServices) {
        this.loading$ = this.loadingSubject.asObservable();
    }

    connect(): Observable<any[]> {
        return this.entitySubject.asObservable();
    }

    disconnect(): void {
        this.entitySubject.complete();
        this.loadingSubject.complete();
    }

    baseFilter(_entities: any[]): QueryResultsModel {
        let entitiesResult = _entities;
        const queryResults = new QueryResultsModel();
        queryResults.items = _entities;
        return queryResults;
    }

    getOffers() {
        return this.caffeServices.getDiscountOffers().pipe(
            tap((response: any) => {
                this.data = response.offers;
                let result = this.baseFilter(this.data);
                this.entitySubject.next(result.items);
            }),
            catchError(err => of(new QueryResultsModel([], err))),
            finalize(() => this.loadingSubject.next(false))
        ).toPromise()
    }
}
