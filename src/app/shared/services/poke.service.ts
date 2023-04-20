import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  public pokemons(page: number = 1, limit: number = 18): Observable<any> {
    const offset = (page - 1) * limit;

    return this.http
      .get(`${environment.poke_api}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public getPokemon(name: string): Observable<any> {
    return this.http.get(`${environment.poke_api}/pokemon/${name}`);
  }
}
