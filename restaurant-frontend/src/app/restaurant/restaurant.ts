
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Restaurant as RestaurantService } from '../services/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Restaurant implements OnInit {

  private restaurantService = inject(RestaurantService);

  menuItems: any[] = [];
  orderItems: any[] = [];

  numberOfPeople: number = 1;

  splitBill: any[] = [];
  orderId: string = '';

  paymentSuccessful: boolean = false;
  showReceipt: boolean = false;


  // ================= CATEGORY FILTER =================

  selectedCategory: string = 'All';

  categories: string[] = [
    'All',
    'Burgers',
    'Pizza',
    'Sides',
    'Drinks',
    'Desserts'
  ];


  // ================= CUSTOMIZATION =================

  showCustomization: boolean = false;
  selectedItem: any = null;

  selectedSauce: string = 'None';
  extraCheese: boolean = false;
  noTomato: boolean = false;
  noOnion: boolean = false;
  noPickles: boolean = false;


  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}


  // ================= INIT =================

  ngOnInit() {

    console.log('APP STARTED');

    this.getMenuItems();

    const savedOrderId =
      localStorage.getItem('orderId');

    if (savedOrderId) {

      this.orderId = savedOrderId;

      this.getSavedOrder();

    }
  }


  // ================= MENU =================

  getMenuItems() {

    this.restaurantService.getMenuItems().subscribe({

      next: (data) => {

        this.menuItems = data.data;

        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.log('ERROR:', error);

      }

    });

  }


  // ================= CATEGORY FILTER =================

  filterByCategory(category: string) {

    this.selectedCategory = category;

  }


  getFilteredMenuItems() {

    if (this.selectedCategory === 'All') {

      return this.menuItems;

    }

    return this.menuItems.filter(item => {

      if (
        this.selectedCategory === 'Pizza'
      ) {

        return (
          item.category === 'Pizza' ||
          item.category === 'Pizzas'
        );

      }

      return item.category === this.selectedCategory;

    });

  }


  // ================= CUSTOMIZATION CHECK =================

  needsCustomization(item: any): boolean {

    return (
      item.category === 'Burgers' ||
      item.category === 'Pizza' ||
      item.category === 'Pizzas'
    );

  }


  // ================= ADD TO ORDER =================

  addToOrder(item: any) {

    // Burger and Pizza
    // need customization

    if (this.needsCustomization(item)) {

      this.openCustomization(item);

      return;

    }


    // Drinks, Desserts and Sides
    // are added directly

    const existingItem = this.orderItems.find(

      orderItem =>

        orderItem._id === item._id &&

        orderItem.sauce === 'None' &&

        orderItem.extraCheese === false &&

        orderItem.removedIngredients.length === 0

    );


    if (existingItem) {

      existingItem.quantity++;

    }

    else {

      this.orderItems.push({

        ...item,

        quantity: 1,

        sauce: 'None',

        saucePrice: 0,

        extraCheese: false,

        extraCheesePrice: 0,

        removedIngredients: []

      });

    }

  }


  // ================= OPEN CUSTOMIZATION =================

  openCustomization(item: any) {

    // RESET EVERYTHING FIRST

    this.selectedItem = null;

    this.selectedSauce = 'None';

    this.extraCheese = false;

    this.noTomato = false;

    this.noOnion = false;

    this.noPickles = false;


    // SELECT NEW ITEM

    this.selectedItem = item;


    // OPEN CUSTOMIZATION

    this.showCustomization = true;

  }


  // ================= CLOSE CUSTOMIZATION =================

  closeCustomization() {

    this.showCustomization = false;

    this.selectedItem = null;

  }


  // ================= ADD CUSTOMIZED ITEM =================

  addCustomizedItem() {

    if (!this.selectedItem) {

      return;

    }


    const removedIngredients: string[] = [];


    if (this.noTomato) {

      removedIngredients.push('Tomato');

    }


    if (this.noOnion) {

      removedIngredients.push('Onion');

    }


    if (this.noPickles) {

      removedIngredients.push('Pickles');

    }


    const saucePrice =

      this.selectedSauce !== 'None'

        ? 15

        : 0;


    const extraCheesePrice =

      this.extraCheese

        ? 20

        : 0;


    const customizedItem = {

      ...this.selectedItem,

      quantity: 1,

      sauce: this.selectedSauce,

      saucePrice: saucePrice,

      extraCheese: this.extraCheese,

      extraCheesePrice: extraCheesePrice,

      removedIngredients: removedIngredients

    };


    // ADD TO ORDER

    this.orderItems.push(customizedItem);


    // RESET AFTER ADDING

    this.selectedItem = null;

    this.selectedSauce = 'None';

    this.extraCheese = false;

    this.noTomato = false;

    this.noOnion = false;

    this.noPickles = false;

    this.showCustomization = false;

  }


  // ================= REMOVE ITEM =================

  removeFromOrder(index: number) {

    this.orderItems.splice(index, 1);

  }


  // ================= INCREASE =================

  increaseQuantity(index: number) {

    this.orderItems[index].quantity++;

  }


  // ================= DECREASE =================

  decreaseQuantity(index: number) {

    if (this.orderItems[index].quantity > 1) {

      this.orderItems[index].quantity--;

    }

    else {

      this.orderItems.splice(index, 1);

    }

  }


  // ================= ITEM PRICE =================

  getItemPrice(item: any) {

    return (

      item.price +

      (item.saucePrice || 0) +

      (item.extraCheesePrice || 0)

    );

  }


  // ================= ITEM TOTAL =================

  getItemTotal(item: any) {

    return (

      this.getItemPrice(item) *

      item.quantity

    );

  }


  // ================= TOTAL =================

  getTotal() {

    return this.orderItems.reduce(

      (total, item) => {

        return (

          total +

          this.getItemTotal(item)

        );

      },

      0

    );

  }


  // ================= AMOUNT PER PERSON =================

  getAmountPerPerson() {

    if (this.numberOfPeople <= 0) {

      return 0;

    }

    return (

      this.getTotal() /

      this.numberOfPeople

    );

  }


  // ================= CREATE ORDER =================

  createOrder() {

    if (this.orderItems.length === 0) {

      alert(
        'Please add items to your order.'
      );

      return;

    }


    if (this.numberOfPeople < 1) {
  alert(
    'Number of people must be at least 1.'
  );

  return;
}


    const orderData = {

      items: this.orderItems.map(item => ({

        menuItem: item._id,

        quantity: item.quantity,

        sauce: item.sauce || 'None',

        extraCheese:
          item.extraCheese || false,

        removedIngredients:
          item.removedIngredients || []

      })),

      numberOfPeople:
        this.numberOfPeople

    };


    this.http.post<any>(

      'http://localhost:3000/api/orders',

      orderData

    ).subscribe({

      next: (data) => {

        this.splitBill =
          data.data.splitBill;

        this.orderId =
          data.data._id;


        localStorage.setItem(

          'orderId',

          this.orderId

        );


        alert(
          'Order created successfully!'
        );

      },


      error: (error) => {

        console.log(
          'ORDER ERROR:',
          error
        );


        alert(

          error.error?.message ||

          'Error creating order'

        );

      }

    });

  }


  // ================= PAYMENT =================

  payPerson(person: any) {

    const paymentData = {

      orderId: this.orderId,

      person: person.person

    };


    this.http.post<any>(

      'http://localhost:3000/api/payments',

      paymentData

    ).subscribe({

      next: () => {

        person.status = 'paid';

        this.cdr.detectChanges();


        const allPaid =

          this.splitBill.every(

            p => p.status === 'paid'

          );


        if (allPaid) {

          this.paymentSuccessful = true;

          this.showReceipt = true;

          this.cdr.detectChanges();

        }

      },


      error: (error) => {

        console.log(
          'PAYMENT ERROR:',
          error
        );


        alert(

          error.error?.message ||

          'Payment failed'

        );

      }

    });

  }


  // ================= FINISH ORDER =================

  finishOrder() {

    this.paymentSuccessful = false;

    this.showReceipt = false;

    this.orderItems = [];

    this.splitBill = [];

    this.numberOfPeople = 1;

    this.orderId = '';

    localStorage.removeItem('orderId');

  }


  // ================= SAVED ORDER =================

  getSavedOrder() {

    this.http.get<any>(

      'http://localhost:3000/api/orders'

    ).subscribe({

      next: (data) => {

        const savedOrder =

          data.data.find(

            (order: any) =>

              order._id === this.orderId

          );


        if (savedOrder) {

          this.splitBill =
            savedOrder.splitBill;

          this.numberOfPeople =
            savedOrder.numberOfPeople;

        }

      },


      error: (error) => {

        console.log(

          'GET ORDER ERROR:',

          error

        );

      }

    });

  }

}

