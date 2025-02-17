import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppProductChoose} from './product-choose/product-choose.component';
import {OrderSummaryTableComponent} from './product-table/product-table.component';
import { CommonModule } from '@angular/common'; 
import {OrderReaderComponent} from './order-reader/order-reader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppProductChoose, OrderSummaryTableComponent, CommonModule, OrderReaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Product Order List';
  showOrderTable: boolean = false;

  toggleOrderTable() {
    this.showOrderTable = !this.showOrderTable;
  }
}
