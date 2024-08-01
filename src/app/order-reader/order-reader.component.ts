import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'; // Adjust the path if needed
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient and HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-reader',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './order-reader.component.html',
  styleUrls: ['./order-reader.component.css']
})
export class OrderReaderComponent implements OnInit {
  rows: { product: string; quantity: number }[] = [];
  apiKey = '378bec58599b42e1adbc7a65edd1586f'; // Replace with your VoiceRSS API key
  apiUrl = 'https://api.voicerss.org/';
  private isPlaying = false; // Flag to track audio playback status

  constructor(private sharedService: SharedService, private http: HttpClient) { }

  ngOnInit(): void {
    this.sharedService.rows$.subscribe(rows => this.rows = rows);
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

    this.http.get(`${this.apiUrl}?${params.toString()}`, { responseType: 'blob' })
      .subscribe(blob => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          this.isPlaying = false;
        };
        audio.play().catch(() => {
          this.isPlaying = false;
        });
      }, () => {
        this.isPlaying = false;
      });
  }
}
