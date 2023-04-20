import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'hasItems',
})
export class HasItemsPipe implements PipeTransform {
  transform(subject: any[] | null): unknown {
    if (subject) {
      return subject.length > 0;
    }

    return false;
  }
}
