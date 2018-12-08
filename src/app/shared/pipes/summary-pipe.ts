import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'summaries'})
export class SummaryPipe implements PipeTransform {
  transform(value: string, limit?: number): any {
    if (!value) {return value; }

    const actualLimit = (limit) ? limit : 50;
    return value.substring(0, actualLimit) + '...';
  }
}
