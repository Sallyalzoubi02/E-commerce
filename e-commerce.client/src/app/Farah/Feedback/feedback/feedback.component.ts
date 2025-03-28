import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  constructor(private _myser: FServiceService) { }

  ngOnInit() {
    this.getAllFeedback() 
  }

  feedback: any
  getAllFeedback() {
    this._myser.getFeedback().subscribe((data) => {
      this.feedback = data 
    })
  }
}
