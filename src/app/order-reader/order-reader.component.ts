import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-reader',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './order-reader.component.html',
  styleUrls: ['./order-reader.component.css']
})
export class OrderReaderComponent {
  rows: { product: string; quantity: number }[] = [];
  apiKey = '378bec58599b42e1adbc7a65edd1586f'; 
  apiUrl = 'https://api.voicerss.org/';
  private isPlaying = false; 

  constructor(private sharedService: SharedService, private http: HttpClient) { 
    this.sharedService.rows$.subscribe({
      next: rows => this.rows = rows,
      error: err => console.error('Error: ', err)
    });
  }


  readOrder(): void {
    if (this.isPlaying) {
      return;
    }

    const orderText = this.rows.map(row => `${row.quantity} of ${row.product}`).join(', ');
    this.textToSpeech(orderText);
  }

  textToSpeech(text: string): void {
    const params = new URLSearchParams({
      key: this.apiKey,
      src: text,
      hl: 'en-us',
      r: '0',
      c: 'mp3',
    });

    this.isPlaying = true;

    this.http.get(`${this.apiUrl}?${params.toString()}`, { responseType: 'blob' }).subscribe({
      next: blob => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          this.isPlaying = false;
        };
        audio.play().catch(() => {
          this.isPlaying = false;
        });
      },
      error: () => {
        this.isPlaying = false;
      }
    });
  }
}
