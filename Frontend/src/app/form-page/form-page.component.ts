import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  form!: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage?: string;
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(6), Validators.required]],
    });
  }
  get email() {
    return this.form.get('email')!;
  }

  get name() {
    return this.form.get('name')!;
  }
  onCheckout() {
    this.http
      .post('http://130.61.91.43/api/checkout', {
        items: [
          {
            name: 'ticket',
            quantity: 3,
            item_id: 'price_1MiiMLAMXAbMlIgoIpMGoKmW',
          },
          {
            name: 'blue-shirt',
            quantity: 2,
            item_id: 'price_1MiiGrAMXAbMlIgowBMfSown',
          },
          {
            name: 'white-shirt',
            quantity: 1,
            item_id: 'price_1MiiHkAMXAbMlIgoskLmKVkI',
          },
        ],
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51MiKQsAMXAbMlIgoVOBNyRMQ4WIUjcRHmolE3PrhC8p5SKzdZNpolfmbBBzOCOLvzTdJivRlMCCh0etCsEG8evhK00L9nfbpiP'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
  async onSubmit() {}
}
