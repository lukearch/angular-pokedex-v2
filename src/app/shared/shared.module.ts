import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { HasItemsPipe } from './pipes/has-items.pipe';

@NgModule({
  declarations: [
    CardComponent,
    PokeListComponent,
    PaginationComponent,
    LoadingComponent,
    SearchComponent,
    HasItemsPipe,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    CardComponent,
    PokeListComponent,
    PaginationComponent,
    LoadingComponent,
    SearchComponent,
    HasItemsPipe,
  ],
})
export class SharedModule {}
