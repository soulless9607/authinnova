import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {

  jsonData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/input.json').subscribe(data => {
      this.jsonData = data;
      console.log(this.jsonData);
    });
  }
}
