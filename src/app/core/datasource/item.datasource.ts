import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { MenuItems } from "../interfaces/caffe_interace";
import { QueryResultsModel } from "../models/query-models/query-results.model";
import { CaffeServices } from "../services/caffe.services";



export class ItemDataSource implements DataSource<MenuItems> {

    entitySubject = new BehaviorSubject<MenuItems[]>([]);
    hasItems: boolean = false; // Need to show message: 'No records found
    data: MenuItems[];

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

    getMenuItems() {
        return this.caffeServices.getAllItems().pipe(
            tap((response: any) => {
                this.data = response.items;
                let result = this.baseFilter(this.data);
                this.entitySubject.next(result.items);
            }),
            catchError(err => of(new QueryResultsModel([], err))),
            finalize(() => this.loadingSubject.next(false))
        ).toPromise()
    }
}
