export class QueryParamsModel {
    sortOrder: string; // asc || desc
    sortField: string;
    pageNumber: number;
    pageSize: number;
    length: number;
    filter: any;

    // constructor overrides
    constructor(_filter: any,
        _pageNumber: number = 0,
        _pageSize: number = 10) {
        this.filter = _filter;
        this.sortOrder = "asc";
        this.sortField = "";
        this.pageNumber = _pageNumber;
        this.pageSize = _pageSize;
        this.filter.pageNumber =  this.pageNumber;
    }
}
