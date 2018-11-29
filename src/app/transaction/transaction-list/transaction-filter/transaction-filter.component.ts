import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;


export class Filter {
  TransactionID: string;
  BusinessDomain: string;
  TechnicalDomain: string;
  Component: string;
  Service: string;
  Operation: string;
  StartDateTime: string;
  EndDateTime: string;
  // BusinessRefs: BusinessReference[];
}

export class Chip {
  name: string;
  value: string;
}

export class BusinessReference {
  name: string;
  value: string;
}

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter();

  filter: Filter;
  businessReferences: ({ name: string } | { name: string; value: string })[];
  chips: Chip[];
  selectedBusinessRefName: string;
  selectedTechnicalRefName: string;


  constructor() { }

  ngOnInit() {
    this.filter = new Filter();
    // this.filter.BusinessRefs = [];
    this.chips = [];
    this.businessReferences = [{name: 'BusinessFlow'}, {name: 'Username'}];
  }

  removeFilter(chip: Chip) {
    this.deleteChip(chip);
    delete this.filter[chip.name];
   // const index = this.filter.BusinessRefs.findIndex(businessRef => businessRef.name === chip.name);
   // if (index >= 0) {
   //   this.filter.BusinessRefs.splice(index, 1);
   // }
    this.filterChanged.emit(this.filter);
  }

  addFilter(name: string, value: string) {
    if (value.length > 0) {
      if (name === 'BusinessRef' && this.selectedBusinessRefName !== undefined && this.selectedBusinessRefName.length > 0
        && (this.getChip(this.selectedBusinessRefName) == null || value !== this.getChip(this.selectedBusinessRefName).value)) {
        /*const res = this.filter.BusinessRefs.find(businessRef => businessRef.name === this.selectedBusinessRefName);
        if (res != null) {
          res.value = value;
        } else {
          this.filter.BusinessRefs.push({name: this.selectedBusinessRefName, value: value});
        }
        this.upsertChip({name: this.selectedBusinessRefName, value: value});
        this.filterChanged.emit(this.filter);*/
        delete this.filter['BusinessRef.' + this.selectedBusinessRefName];
        this.filter['BusinessRef.' + this.selectedBusinessRefName] = value;
        this.upsertChip({name: this.selectedBusinessRefName, value: value});
        this.filterChanged.emit(this.filter);
      } else if (name === 'TechnicalRef' &&  this.selectedTechnicalRefName !== undefined && this.selectedTechnicalRefName.length > 0
        && (this.getChip(this.selectedTechnicalRefName) == null || value !== this.getChip(this.selectedTechnicalRefName).value)) {
        delete this.filter[this.selectedTechnicalRefName];
        this.filter[this.selectedTechnicalRefName] = value;
        this.upsertChip({name: this.selectedTechnicalRefName, value: value});
        this.filterChanged.emit(this.filter);
      } else if ((name === 'StartDateTime' || name === 'EndDateTime') ) {
        delete this.filter[name];
        this.filter[name] = value;
        this.upsertChip({name: name, value: value});
        this.filterChanged.emit(this.filter);
      } else {

      }
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
      if (chip.value.length > 0 ) {
        this.chips.push(chip);
      }
    } else {
      fchip.value = chip.value;
    }
  }
}
