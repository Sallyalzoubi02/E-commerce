import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MyServiceService } from './Sally/my-service.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  isAdmin: boolean = false; // ✅ تأكد من تعريف المتغير هنا

  constructor(private http: HttpClient, private _serv: MyServiceService) {}

  ngOnInit() {
    this._serv.currentUserRole.subscribe(role => {
      this.isAdmin = role === "admin"; // ✅ تحقق مما إذا كان المستخدم Admin
    });
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'e-commerce.client';
}
