import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private productsSource = new BehaviorSubject<string[]>(['Product A', 'Product B', 'Product C','Product D','Product E','Product F','Product G','Product H','Product I','Product J','Product K','Product L','Product M']);
  products$ = this.productsSource.asObservable();

  private productRowSource = new BehaviorSubject<string>('');
  productRow$ = this.productRowSource.asObservable();

  private quantityRowSource = new BehaviorSubject<number>(0);
  quantityRow$ = this.quantityRowSource.asObservable();

  private rowsSource = new BehaviorSubject<{ product: string; quantity: number }[]>([]);
  rows$ = this.rowsSource.asObservable();

  // Update methods
  updateProducts(products: string[]) {
    this.productsSource.next(products);
  }

  updateProductRow(product: string) {
    this.productRowSource.next(product);
  }

  updateQuantityRow(quantity: number) {
    this.quantityRowSource.next(quantity);
  }

  addRow(row: { product: string; quantity: number }) {
    const currentRows = this.rowsSource.value;
    this.rowsSource.next([...currentRows, row]);
  }
}
