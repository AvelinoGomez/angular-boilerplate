import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DemoApiService } from '../../services/demo-api.service';
import { TesteFormsService } from '../../services/teste-forms.service';

@Component({
  standalone: false,
  selector: 'app-demo-home',
  templateUrl: './demo-home.component.html',
  styleUrl: './demo-home.component.scss'
})
export class DemoHomeComponent {

  formGroup!: FormGroup;

  users = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' },
    { name: 'Charlie', email: 'charlie@example.com', role: 'Guest' },
  ];

  sampleText: string = 'This is a sample text to demonstrate pipes!';
  today: Date = new Date();
  amount: number = 12345.67;
  phoneNumber: string = "81999999999";
  cpfExample: string = "00000000000";
  cnpjExample: string = "00000000000000";

  constructor(
    private readonly formService: TesteFormsService,
    private readonly demoService: DemoApiService
  ){
    this.formGroup = this.formService.generalDemoForm;

    this.demoService.getInfo().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error(error)
    });
  }

}
