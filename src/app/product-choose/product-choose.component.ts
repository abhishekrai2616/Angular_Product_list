import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-product-choose',
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatOptionModule, FormsModule, CommonModule],
  templateUrl: './product-choose.component.html',
  styleUrls: ['./product-choose.component.css']
})
export class AppProductChoose {
  products: string[] = [];
  productRow: string = '';
  quantityRow: number = 0;
  rows: { product: string; quantity: number }[] = [];

  constructor(private sharedService: SharedService) {
    this.sharedService.products$.subscribe(products => this.products = products);
    this.sharedService.productRow$.subscribe(productRow => this.productRow = productRow);
    this.sharedService.quantityRow$.subscribe(quantityRow => this.quantityRow = quantityRow);
    this.sharedService.rows$.subscribe(rows => this.rows = rows);
  }

  addProduct() {
    const existingProduct = this.rows.find(row => row.product === this.productRow);
    
    if (existingProduct) {
      existingProduct.quantity += this.quantityRow;
    } else {
      this.sharedService.addRow({ product: this.productRow, quantity: this.quantityRow });
    }

    this.productRow = '';
    this.quantityRow = 0; 
  }
}
