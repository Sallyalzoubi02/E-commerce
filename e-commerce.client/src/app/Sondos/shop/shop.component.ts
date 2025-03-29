import { Component, NgZone, OnInit } from '@angular/core';
import { ServService } from '../api/serv.service';
import { MyServiceService } from '../../Sally/my-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: any = 'All';
  minPrice: number = 0;
  maxPrice: number = 1000;
  searchText: string = '';
  currentUser: any;
  quantity: number = 1;
  productId!: string;
  searchQuery: string = '';
  cartId: any;
  userId: any;
  selectedproduct: any;

  constructor(private shopService: ServService, private ngZone: NgZone, private _serv: MyServiceService) { }

  ngOnInit(): void {
    this.shopService.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.getUserCartId();

    this.shopService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });
  }

  getUserCartId() {
    this._serv.currentlogged.subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.shopService.getCartIdByUser(this.userId).subscribe({
          next: (cartData: any[]) => {
            if (cartData.length > 0) {
              this.cartId = cartData[0].id;
            } else {
              this.createCart();
            }
          },
          error: (err) => console.error('Error fetching cart ID:', err)
        });
      }
    });
  }

  createCart() {
    if (!this.userId) {
      console.error("User ID is not available");
      return;
    }
    this.shopService.createCart(this.userId).subscribe({
      next: (newCart: any) => {
        this.cartId = newCart.id;
        console.log("New cart created with ID:", this.cartId);
      },
      error: (err) => console.error('Error creating cart:', err)
    });
  }

  // ✅ عند الضغط على "Add to Cart"
  addToCart(product: any) {
    this.selectedproduct = product; // حفظ المنتج المحدد
    if (!this.userId) {
      console.error("User ID is undefined. Ensure getUserCartId() is called before addToCart.");
      return;
    }

    if (!this.cartId) {
      // إنشاء سلة جديدة إذا لم تكن موجودة
      this.shopService.createCart(this.userId).subscribe({
        next: (newCart: any) => {
          this.cartId = newCart.id;
          console.log("New cart created with ID:", this.cartId);
          this.checkAndAddProduct(); // بعد إنشاء السلة، التحقق من وجود المنتج ثم إضافته
        },
        error: (err) => {
          console.error('Error creating cart:', err);
        }
      });
    } else {
      this.checkAndAddProduct(); // إذا كانت السلة موجودة، تحقق وأضف المنتج
    }
  }

  // ✅ التأكد مما إذا كان المنتج موجودًا في السلة قبل الإضافة
  checkAndAddProduct() {
    if (!this.cartId || !this.selectedproduct) {
      console.error("Cart ID or selected product is missing.");
      return;
    }

    // جلب المنتجات الموجودة في السلة
    this.shopService.getCartItemsByCartId(this.cartId).subscribe({
      next: (cartItems: any[]) => {
        // البحث عن المنتج داخل السلة
        const existingItem = cartItems.find(item => item.ProductId === this.selectedproduct.id);

        if (existingItem) {
          // المنتج موجود مسبقًا، زيادة الكمية فقط
          const updatedCartItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1 // زيادة الكمية بواحد
          };

          this.updateCartItem(existingItem.id, updatedCartItem);
        } else {
          // المنتج غير موجود، أضفه للسلة
          this.addNewProductToCart();
        }
      },
      error: (err) => {
        console.error("Failed to fetch cart items:", err);
        // في حالة وجود خطأ، أضف المنتج مباشرةً
        this.addNewProductToCart();
      }
    });
  }

  // ✅ إضافة منتج جديد للسلة
  addNewProductToCart() {
    if (!this.selectedproduct) {
      console.error("Selected product is undefined or null.");
      return;
    }

    const cartItem = {
      productName: this.selectedproduct.name,
      productPrice: this.selectedproduct.price,
      quantity: 1, // بدء الكمية من 1
      cartId: this.cartId,
      ProductId: this.selectedproduct.id
    };

    this.shopService.addProductToCart(cartItem).subscribe({
      next: (response) => {
        console.log("Product added to cart:", response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product added to cart successfully!',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add product to cart!',
        });
      }
    });
  }

  // ✅ تحديث الكمية إذا كان المنتج موجودًا في السلة
  updateCartItem(cartItemId: number, updatedCartItem: any) {
    this.shopService.updateCartItem(cartItemId, updatedCartItem).subscribe({
      next: (response) => {
        console.log("Product quantity updated in cart:", response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product quantity updated successfully!',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update product quantity!',
        });
      }
    });
  }

  startVoiceSearch() {
    const recognition = new (window as any).webkitSpeechRecognition(); // التأكد من دعم المتصفح
    recognition.lang = 'ar-SA,en-US'; // تغيير اللغة إذا لزم الأمر
    recognition.start();

    recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        this.searchQuery = event.results[0][0].transcript; // استخراج النص المحوّل
        console.log('تم التعرف على: ', this.searchQuery);
      });
    };

    recognition.onerror = (event: any) => {
      console.error('خطأ في التعرف على الصوت:', event.error);
    };
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.categoryID == this.selectedCategory;
      const matchesPrice = product.price >= this.minPrice && product.price <= this.maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }
}
