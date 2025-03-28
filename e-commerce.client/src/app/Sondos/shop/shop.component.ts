import { Component, OnInit } from '@angular/core';
import { ServService } from '../api/serv.service';

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
  cartId: number | null = null;



  constructor(private shopService: ServService) { }

  ngOnInit(): void {
    this.shopService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.shopService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });

    this.fetchCurrentUser();
  }
 

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.categoryID == this.selectedCategory;
      const matchesPrice = product.price >= this.minPrice && product.price <= this.maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }

  fetchCurrentUser() {
    this.shopService.getUsers().subscribe(users => {
      this.currentUser = users[0];
      this.fetchUserCart();
    });
  }

  fetchUserCart() {
    this.shopService.getCart().subscribe(carts => {
      let userCart = carts.find(cart => cart.userId == this.currentUser.id);
      if (userCart) {
        this.cartId = userCart.id;
      } else {
        this.createCart();
      }
    });
  }

  createCart() {
    this.shopService.createCart(this.currentUser.id).subscribe(cart => {
      console.log(cart); 
      this.cartId = cart.id; 
    });
  }


  addToCart(product: any) {
    if (!this.cartId) {
      console.error("No cart found for the user!");
      return;
    }

    this.shopService.addToCart(this.cartId, product).subscribe(response => {
      console.log("Product added to cart:", response);
      alert("Product added to cart successfully!");
    });
  }
}
