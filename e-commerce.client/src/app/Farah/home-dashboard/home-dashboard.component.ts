import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'] 
})
export class HomeDashboardComponent implements OnInit {
  categoryCount: number = 0;
  productCount: number = 0;
  userCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategoryCount();
    this.getProductCount();
    this.getUserCount();
    this.getUsersData();
  }

  getCategoryCount() {
    this.http.get<any[]>('https://67e2bee997fc65f535376bc7.mockapi.io/category')
      .subscribe(data => {
        this.categoryCount = data.length;
      });
  }

  getProductCount() {
    this.http.get<any[]>('https://67d293bd90e0670699be292f.mockapi.io/product')
      .subscribe(data => {
        this.productCount = data.length;
      });
  }

  getUserCount() {
    this.http.get<any[]>('https://67e45d142ae442db76d42a1d.mockapi.io/user')
      .subscribe(data => {
        this.userCount = data.length;
      });
  }

  // بيانات المخطط
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Users Registered',
        borderColor: '#f5f5dc',
        backgroundColor: 'rgb(206, 170, 157, 50%)',
        fill: true,
        tension: 0.4, // يجعل الخط منحني أكثر
        pointBackgroundColor: '#f5f5dc',
        pointBorderColor: '#f5f5dc',
      }
    ]
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  getUsersData() {
    this.http.get<any[]>('https://67e45d142ae442db76d42a1d.mockapi.io/user')
      .subscribe(users => {
        
        const monthlyData = this.processUserData(users);

        // تحديث بيانات المخطط
        this.lineChartData = {
          labels: Object.keys(monthlyData),
          datasets: [
            {
              data: Object.values(monthlyData),
              label: 'Users Registered',
              borderColor: '#f5f5dc',
              backgroundColor: 'rgb(206, 170, 157, 50%)',
              fill: true,
              tension: 0.4, // يجعل الخط منحني أكثر
              pointBackgroundColor: '#f5f5dc',
              pointBorderColor: '#f5f5dc',
            }
          ]
        };
      });
  }

  processUserData(users: any[]): { [key: string]: number } {
    let monthlyCount: { [key: string]: number } = {};
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthNumber = lastMonth.getMonth() + 1; // الشهر يكون من 0 إلى 11، لذلك نضيف 1
   
    users.forEach(user => {
    
      if (user.date) {
        const userDate = new Date(user.date);
        const userMonth = userDate.getMonth() + 1; // نضيف 1 لأن الأشهر تبدأ من 0
        const userYear = userDate.getFullYear();
        const userDay = userDate.getDate().toString();

        // التحقق إذا كان المستخدم قد سجل في الشهر الماضي
        if (userMonth === lastMonthNumber && userYear === lastMonth.getFullYear()) {
          monthlyCount[userDay] = (monthlyCount[userDay] || 0) + 1;
        }
      }
    });

    return monthlyCount;
  }
}
