import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatOptionModule, FormsModule, CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class AppOrderSummary {
  products: string[] = [];
  productRow: string = '';
  quantityRow: number = 0;
  rows: { product: string; quantity: number }[] = [];

  constructor(private sharedService: SharedService) {
    // Subscribe to shared service observables
    this.sharedService.products$.subscribe(products => this.products = products);
    this.sharedService.productRow$.subscribe(productRow => this.productRow = productRow);
    this.sharedService.quantityRow$.subscribe(quantityRow => this.quantityRow = quantityRow);
    this.sharedService.rows$.subscribe(rows => this.rows = rows);
  }

  addProduct() {
    this.sharedService.addRow({ product: this.productRow, quantity: this.quantityRow });
    this.productRow='';
    this.quantityRow=0;
  }
}
