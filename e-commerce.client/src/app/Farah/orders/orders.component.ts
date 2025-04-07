import { Component } from '@angular/core';
import { FServiceService } from '../serviceFarah/f-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: any;

  constructor(private srv: FServiceService) { }

  ngOnInit() {
    this.getOrders()
  }

  getOrders() {
    this.srv.getOrdes().subscribe((ordres) => {
      this.orders = ordres;
    })
  }

  updateStatus(item: any, newStatus: string) {
    // نحطها مباشرة في الكائن
    const updatedOrder = { ...item, status: newStatus };

    // استدعاء الدالة من الخدمة لتحديث الحالة في الـ API
    this.srv.updateOrderStatus(updatedOrder).subscribe({
      next: (res) => {
        console.log('Status updated successfully', res);
        item.status = newStatus; // نحدث الحالة محليًا بعد نجاح التعديل
      },
      error: (err) => {
        console.error('Error updating status', err);
        // ممكن نرجع القيمة الأصلية إذا بدك
      }
    });
  }
}
