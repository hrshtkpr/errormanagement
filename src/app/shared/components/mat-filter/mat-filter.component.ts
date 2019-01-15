import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {BusinessRef} from '../../../transaction/transaction.model';
import {map} from 'rxjs/operators';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectBusinessRefListLoading, selectTransactionASMLEventListLoading} from '../../../transaction/transaction.selectors';
import {AppState} from '../../../reducers';

export class Filter {
}

class Chip {
  name: string;
  value: string;
}

@Component({
  selector: 'app-mat-filter',
  templateUrl: './mat-filter.component.html',
  styleUrls: ['./mat-filter.component.scss']
})
export class MatFilterComponent implements OnChanges {
  // ADD INOUT PROPERTY FOR INITIALIZING FILTER
  @Input() technicalReferences: string[];
  @Input() businessReferences: BusinessRef[];
  @Input() exceptionReferences: string[];
  @Output() filterChanged = new EventEmitter();
  @Input() filter: Filter;
  chips: Chip[];
  businessReferencesNames: string[];
  businessReferencesValues: string[];
  selectedBusinessRef: string;
  selectedBusinessRefValue: string;
  selectedTechnicalRefName: string;
  selectedExceptionRefName: string;
  businessRefListLoading$: Observable<boolean>;


  constructor(private store: Store<AppState>) {
    this.technicalReferences = [];
    this.businessReferences = [];
    this.exceptionReferences = [];
    this.chips = [];
    this.filter = new Filter();
  }

  ngOnChanges() {
    this.filterToChips();
    this.businessReferencesNames = this.businessReferences && Array.from (
      new Set (this.businessReferences.map( busref => busref && busref.Name))
    );

    this.businessRefListLoading$ = this.store.pipe(
      select(selectBusinessRefListLoading)
    );
  }

  removeCriteria(name: string) {
    delete this.filter[name];
    // this.deleteChip({name: name, value: null});
    this.filterToChips();
    this.filterChanged.emit(this.filter);
  }
  onBusinessRefNameChanged(businessRefName: string) {
    // console.log(businessRef);
    this.businessReferencesValues = this.businessReferences.filter(busRef => busRef.Name === businessRefName)
      .map(busRef => busRef.Value);
  }


  addCriteria(name: string, value: string) {
    if (value.length > 0) {
      if (name === 'BusinessRef' && this.selectedBusinessRef !== undefined && this.selectedBusinessRef.length > 0
        && (this.getChip(this.selectedBusinessRef) == null || value !== this.getChip(this.selectedBusinessRef).value)) {
        delete this.filter['BusinessRef.' + this.selectedBusinessRef];
        this.filter['BusinessRef.' + this.selectedBusinessRef] = value;
        this.filterChanged.emit(this.filter);
      } else if (name === 'TechnicalRef' && this.selectedTechnicalRefName !== undefined && this.selectedTechnicalRefName.length > 0
        && (this.getChip(this.selectedTechnicalRefName) == null || value !== this.getChip(this.selectedTechnicalRefName).value)) {
        delete this.filter[this.selectedTechnicalRefName];
        this.filter[this.selectedTechnicalRefName] = value;
        this.filterChanged.emit(this.filter);
      } else if (name === 'ExceptionRef' && this.selectedExceptionRefName !== undefined && this.selectedExceptionRefName.length > 0
        && (this.getChip(this.selectedExceptionRefName) == null || value !== this.getChip(this.selectedExceptionRefName).value)) {
        delete this.filter[this.selectedExceptionRefName];
        this.filter[this.selectedExceptionRefName] = value;
        this.filterChanged.emit(this.filter);
      } else if ((name === 'StartDateTime' || name === 'EndDateTime')) {
        delete this.filter[name];
        this.filter[name] = value;
        this.filterChanged.emit(this.filter);
      } else {

      }
      this.filterToChips();
    }
  }

  deleteChip(chip: Chip) {
    const name = chip.name;
    const index = this.chips.findIndex(lchip => lchip.name === chip.name);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  getChip(chipName: string): Chip {
    const fchip = this.chips.find(lchip => lchip.name === chipName);
    return fchip;
  }

  upsertChip(chip: Chip) {
    const fchip = this.chips.find(lchip => lchip.name === chip.name);
    if (fchip == null) {
      if (chip.value.length > 0) {
        this.chips.push(chip);
      }
    } else {
      fchip.value = chip.value;
    }
  }

  filterToChips(): void {
    this.chips.splice(0, this.chips.length);
    for (const criteria in this.filter) {
      this.upsertChip({name: criteria, value: this.filter[criteria]});
      /*      if (criteria.startsWith('BusinessRef.')) {
              this.upsertChip({name: criteria.substring('BusinessRef.'.length), value: this.filter[criteria]});
            } else {
              this.upsertChip({name: criteria, value: this.filter[criteria]});
            }*/
    }
  }

}
