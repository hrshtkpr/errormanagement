import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BusinessRef} from '../../transaction.model';
import {TransactionService} from '../../transaction.service';


export class Filter {
}

export class Chip {
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
  businessReferences: BusinessRef[];
  chips: Chip[];
  selectedBusinessRefName: string;
  selectedTechnicalRefName: string;
  selectedExceptionRefName: string;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.filter = new Filter();
    this.chips = [];
    this.getBusinessRefs(this.filter);
  }

  removeCriteria(chip: Chip) {
    delete this.filter[chip.name];
    this.filterToChips();
    this.filterChanged.emit(this.filter);
  }

  getBusinessRefs(lfilter: Filter) {
    const properties: string[] = Object.keys(lfilter);
    const businessRefProperty = properties.find(property => property.startsWith('BusinessRef.'));
    if (businessRefProperty == null) {
      this.transactionService.getBusinessRefs(lfilter).subscribe(response => {
        if (response['BusinessRefs'] !== null) {
          const businessRefs: BusinessRef[] = response['BusinessRefs'];
          this.businessReferences = businessRefs;
        }
      });
    }
  }

  addCriteria(name: string, value: string) {
    if (value.length > 0) {
      if (name === 'BusinessRef' && this.selectedBusinessRefName !== undefined && this.selectedBusinessRefName.length > 0
        && (this.getChip(this.selectedBusinessRefName) == null || value !== this.getChip(this.selectedBusinessRefName).value)) {
        delete this.filter['BusinessRef.' + this.selectedBusinessRefName];
        this.filter['BusinessRef.' + this.selectedBusinessRefName] = value;
        this.filterChanged.emit(this.filter);
      } else if (name === 'TechnicalRef' && this.selectedTechnicalRefName !== undefined && this.selectedTechnicalRefName.length > 0
        && (this.getChip(this.selectedTechnicalRefName) == null || value !== this.getChip(this.selectedTechnicalRefName).value)) {
        delete this.filter[this.selectedTechnicalRefName];
        this.filter[this.selectedTechnicalRefName] = value;
        this.getBusinessRefs(this.filter);
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
      if (criteria.startsWith('BusinessRef.')) {
        this.upsertChip({name: criteria.substring('BusinessRef.'.length - 1 ), value: this.filter[criteria]});
      } else {
        this.upsertChip({name: criteria, value: this.filter[criteria]});
      }
    }
  }
}
