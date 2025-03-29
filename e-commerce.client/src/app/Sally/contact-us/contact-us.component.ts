import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import Swal from 'sweetalert2';


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
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Error sending message:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send message. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }


}
