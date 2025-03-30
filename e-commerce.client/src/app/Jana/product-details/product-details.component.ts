import { Component } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MyServiceService } from '../../Sally/my-service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  selectedproduct: any;
  id: any;
  comments: any[] = [];
  newComment: string = '';
  rating: number = 0;
  quantity: number = 1;
  productId!: string;
  userName: string = "";
  productUrl: string = "";
  cartId: any;
  userId: any;
  cartItemsCount: any;
  constructor(private serv: ServiceService, private active: ActivatedRoute, private _serv: MyServiceService) { }

  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get('id')||'1';
    //this.id = "3";
    this.viewProductDetails();

    this.getComments();

    this.getUserCartId();

    this._serv.getCartItemsCount().subscribe(count => {
      this.cartItemsCount = count;
    });
     }
   
  viewProductDetails() {
    this.serv.getProductDetails(this.id).subscribe((data: any) => {
      this.selectedproduct = data;
      this.productId = data.id;
      this.productUrl = `https://yourwebsite.com/product/${this.id}`;
    });

  }

  getStarsArray(rating: number): string[] {
    return Array(5).fill("far fa-star").map((_, i) => i < rating ? "fas fa-star" : "far fa-star");
  }

  getComments() {
    this.serv.getCommentsByProductId(this.id).subscribe((data: any) => {
      this.comments = data; 
      console.log(this.comments);
    });
  
  }

  submitComment(event: Event) {
    event.preventDefault(); 

    if (!this.newComment.trim()) return alert('Comment cannot be empty');

    let commentData = {
      productID: this.productId,
      message: this.newComment,
      userName: this.userName,
      rating: this.rating
    };

    this.serv.addComment(commentData).subscribe(
      (response) => {
        this.comments.push(commentData); 
        this.newComment = ''; 
        this.rating = 0; 
        this.getComments();
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }

  setRating(star: number) {
    this.rating = star;
  }

  shareOnFacebook() {
    const url = encodeURIComponent(this.productUrl); // رابط المنتج
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookShareUrl, '_blank');
  }

  getUserCartId() {

    this._serv.currentlogged.subscribe((id) => this.userId = id)
    this.serv.getCartIdByUser(this.userId).subscribe({
      next: (cartData: any[]) => {
        console.log("Cart Data:", cartData);
        if (cartData.length > 0) {
          this.cartId = cartData[0].id;
        } else {
          // إذا لم يكن للمستخدم سلة، قم بإنشائها
          this.serv.createCart(this.userId).subscribe({
            next: (newCart: any) => {
              this.cartId = newCart.id; // حفظ معرف السلة الجديدة
              console.log("New cart created with ID:", this.cartId);
            },
            error: (err) => console.error('Error creating cart:', err)
          });
        }
      }
    })

    //this.serv.getUserId().subscribe(userId => {
    //  if (userId) {
    //    this.userId = userId; // احفظ userId للاستخدام لاحقًا
    //    
    //      error: (err) => console.error('Error fetching cart data:', err)
    //    });
    //  }
    //});
  }
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }




  addToCart() {

    if (!this.userId) {
      console.error("User ID is undefined. Ensure getUserCartId() is called before addToCart.");
      return;
    }
    if (!this.cartId) {
      
      this.serv.createCart(this.userId).subscribe({
        next: (newCart: any) => {
          this.cartId = newCart.id; 
          console.log("New cart created with ID:", this.cartId);

         
          this.addProductToCart();
        },
        
      });
    } else {
     
      this.addProductToCart();
    }
  }
  addProductToCart() {
    if (!this.cartId) {
      console.error("Cart ID is undefined. Cannot fetch cart items.");
      return;
    }

    this.serv.getCartItemsByCartId(this.cartId).subscribe({
      next: (cartItems: any[]) => {
        if (!cartItems || cartItems.length === 0) {
          console.log("Cart is empty, adding first product...");

          // السلة فارغة، أضف المنتج مباشرةً
          this.addNewProductToCart();
          return;
        }

        // البحث عن المنتج داخل السلة
        const existingItem = cartItems.find(item => item.ProductId === this.productId);

        if (existingItem) {
          // المنتج موجود مسبقًا، لذا نقوم بتحديث الكمية
          const updatedQuantity = existingItem.quantity + this.quantity;

          const updatedCartItem = {
            ...existingItem,
            quantity: updatedQuantity
          };

          this.serv.updateCartItem(existingItem.id, updatedCartItem).subscribe({
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

        } else {
          // المنتج غير موجود، أضفه للسلة
          this.addNewProductToCart();
        }
      },
      error: (err) => {
        console.error("Failed to fetch cart items:", err);

        // في حالة الفشل، أضف المنتج مباشرةً
        this.addNewProductToCart();
      }
    });
  }

  addNewProductToCart() {
    const cartItem = {
      productName: this.selectedproduct.name,
      productPrice: this.selectedproduct.price,
      productImg: this.selectedproduct.img,
      quantity: this.quantity,
      cartId: this.cartId,
      ProductId: this.productId
    };

    this.serv.addProductToCart(cartItem).subscribe({
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
    this._serv.updateCartCount(this.cartItemsCount + 1); 
  }
  //addProductToCart() {
  //  const cartItem = {
  //    productName: this.selectedproduct.name,
  //    productPrice: this.selectedproduct.price,
  //    quantity: this.quantity,
  //    cartId: this.cartId,
  //    ProductId: this.productId
  //  };

  //  this.serv.addProductToCart(cartItem).subscribe({
  //    next: (response) => {
  //      console.log("Product added to cart:", response);

  //      Swal.fire({
  //        icon: 'success',
  //        title: 'Success!',
  //        text: 'Product added to cart successfully!',
  //        showConfirmButton: false,
  //        timer: 2000
  //      });
  //    },
  //    error: () => {
  //      Swal.fire({
  //        icon: 'error',
  //        title: 'Error!',
  //        text: 'Failed to add product to cart!',
  //      });
  //    }
  //  });
  //}

  //addToCart() {
  //  if (!this.cartId) {

     

  //    }

  //    const cartItem = {
  //      productName: this.selectedproduct.name,
  //      productPrice: this.selectedproduct.price,
  //      quantity: this.quantity,
  //      cartId: this.cartId,
  //      ProductId: this.productId
  //    };

  //    this.serv.addProductToCart(cartItem).subscribe({
  //      next: (response) => {
  //        console.log("Product added to cart:", response);

  //        // ✅ إظهار SweetAlert عند نجاح الإضافة
  //        Swal.fire({
  //          icon: 'success',
  //          title: 'Success!',
  //          text: 'Product added to cart successfully!',
  //          showConfirmButton: false,
  //          timer: 2000
  //        });
  //      },

  //    });

  //  }

  





}
