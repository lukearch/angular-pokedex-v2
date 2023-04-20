import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public pokemons: BehaviorSubject<any[]>;
  public filteredPokemons: BehaviorSubject<any[]>;
  public currentPage: BehaviorSubject<number>;
  public total = 0;
  public limit = 18;

  @ViewChild('header') public header?: ElementRef<HTMLDivElement>;

  constructor(private pokeService: PokeService) {
    this.filteredPokemons = new BehaviorSubject<any[]>([]);
    this.pokemons = new BehaviorSubject<any[]>([]);
    this.currentPage = new BehaviorSubject<number>(1);
  }

  ngOnInit(): void {
    this.getPokemons(this.currentPage.value);
  }

  public getPokemons(page: number): void {
    const subscription = this.pokeService.pokemons(page, this.limit).subscribe({
      next: (pokemons) => {
        this.total = pokemons.count;
        pokemons.results.forEach((pokemon: any) => {
          this.getPokemon(pokemon.name);
        });
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  }

  public getPokemon(name: string): void {
    const subscription = this.pokeService.getPokemon(name).subscribe({
      next: (pokemon) => {
        this.pokemons.next([
          ...this.pokemons.value,
          {
            name: pokemon.name,
            image: pokemon.sprites.front_default,
          },
        ]);
      },
      complete: () => {
        subscription.unsubscribe();
      },
    });
  }

  public nextPage(): void {
    this.currentPage.next(this.currentPage.value + 1);
    this.getPokemons(this.currentPage.value);
  }

  public handleFilter(value: string): void {
    this.filteredPokemons.next([]);

    if (!value) {
      return;
    }

    this.pokemons.value.map((pokemon) => {
      if (pokemon.name.includes(value.toLocaleLowerCase())) {
        this.filteredPokemons.next([...this.filteredPokemons.value, pokemon]);
      }
    });
  }
}
