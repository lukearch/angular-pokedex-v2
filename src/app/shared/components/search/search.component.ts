import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public value: string;
  public valueUpdate: Subject<string>;
  @Output() public search: EventEmitter<string>;

  constructor() {
    this.value = '';
    this.valueUpdate = new Subject<string>();
    this.search = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.valueUpdate
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search.emit(value);
      });
  }
}
