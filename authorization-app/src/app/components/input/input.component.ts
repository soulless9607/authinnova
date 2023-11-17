import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-authorization',
  template: `
    <div>
      <textarea [(ngModel)]="jsonData" placeholder="Enter JSON data"></textarea>
      <button (click)="processInput()">Process</button>
      <div *ngIf="data">
        <pre>{{ data }}</pre>
      </div>
    </div>
  `,
})
export class InputComponent {
  jsonData: string = '';
  data: any;

  constructor(private authorizationService: AuthorizationService) {}

  processInput() {
    this.authorizationService.processInput(this.jsonData).subscribe(
      (result) => {
        this.data = JSON.parse(this.jsonData);
        console.log(this.data);
      },
      (error) => {
        console.error('Error processing input:', error);
      }
    );
  }
}