import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-order-summary-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class OrderSummaryTableComponent implements OnInit {
  rows: { product: string; quantity: number }[] = [];
  displayedColumns: string[] = ['product', 'quantity'];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.rows$.subscribe(rows => this.rows = rows);
  }
}
