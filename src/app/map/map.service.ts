import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Country } from "./map.domain";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient) {}

    getAllCounties(): Observable<Country[]> {
        return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
            map(countries => countries.map(c => ({
                name: c['name']['common'],
                capital: c['capital'],
                region: c['region'],
                code: c['cca2']
            }))),
            catchError(e => of([]))
        );
    }

    
}