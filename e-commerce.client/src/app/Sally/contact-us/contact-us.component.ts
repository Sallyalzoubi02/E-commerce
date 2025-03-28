import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  formData = { name: '', phoneNumber: '', email: '', message: '' };

  constructor(private _ser: MyServiceService) { }

  sendMessage() {
    this._ser.addFeedback(this.formData).subscribe(
      response => {
        console.log('Message sent successfully:', response);
        alert('Your message has been sent!');
      },
      error => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    );
  }

}
