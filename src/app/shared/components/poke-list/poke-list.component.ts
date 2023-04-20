import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeListComponent implements AfterViewInit {
  @Input() pokemons: any[] | null;
  @Input() headerHeight: number | null;
  @Output() public reachEnd: EventEmitter<void>;

  @ViewChild('list') public list?: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {
    this.pokemons = [];
    this.headerHeight = 0;
    this.reachEnd = new EventEmitter<void>();
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.list?.nativeElement,
      'height',
      `calc(100vh - ${this.headerHeight}px)`
    );
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;
    if (scrollPosition === scrollHeight) {
      console.log('reached end');
      this.reachEnd.emit();
    }
  }
}
