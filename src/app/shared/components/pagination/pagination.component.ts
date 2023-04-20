import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @Input() public totalPages: number | null;
  @Input() public currentPage: number | null;
  @Output() public changePageEmitter: EventEmitter<number>;
  public pages: BehaviorSubject<any[]>;

  constructor() {
    this.totalPages = 0;
    this.currentPage = 1;
    this.pages = new BehaviorSubject<any[]>([]);
    this.changePageEmitter = new EventEmitter<number>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] && changes['totalPages'].currentValue) {
      const totalPages = changes['totalPages'].currentValue;
      this.createPages(totalPages);
    }

    if (changes['currentPage'] && changes['currentPage'].currentValue) {
      const currentPage = changes['currentPage'].currentValue;
      this.pages.next(
        this.pages.value.map((page) => {
          return {
            ...page,
            active: page.page === currentPage,
          };
        })
      );
    }
  }

  public createPages(totalPages: number): void {
    for (let i = 1; i <= totalPages; i++) {
      this.pages.next([
        ...this.pages.value,
        {
          page: i,
          active: i === this.currentPage,
        },
      ]);
    }
  }

  public changePage(page: number): void {
    this.changePageEmitter.emit(page);
  }
}
