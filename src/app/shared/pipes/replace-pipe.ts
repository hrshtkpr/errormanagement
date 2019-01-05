import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
  transform(value: string, findWhat?: string, replaceWith?: string): any {
    if (!value) {
      return value;
    }

    const dest = (replaceWith) ? replaceWith : '';
    return value.replace(findWhat, dest);
  }
}
