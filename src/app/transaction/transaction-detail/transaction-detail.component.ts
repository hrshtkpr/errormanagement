import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  alternate = true;
  toggle  = true;
  color  = true;
  size  = 40;
  expandEnabled = true;

  entries = [
    {
      header: 'header',
      content: 'content'
    }
  ];

  ngOnInit(): void {
  }

  addEntry() {
    this.entries.push({
      header: 'header',
      content: 'content'
    });
  }

  removeEntry() {
    this.entries.pop();
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`);
  }

}
