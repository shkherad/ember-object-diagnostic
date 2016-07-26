/// Ember Object Diagnostic ///

// Use Ember Objects and Classes to represent a shopping cart!
// Your abstractions will be `Cart` and `Order`.
//
// An Order should have
//  -  a unit price
//  -  a quantity
//  -  a computed property called `orderPrice`, equal to price times quantity

const Order = Ember.Object.extend({
  orderPrice: Ember.computed('unit_price', 'quantity', function(){
    return this.get('unit_price') * this.get('quantity');
  })
});

// A Cart should have
//  -  an `addToCart` method, which adds a given Item to an array
//      called `orders` (HINT: You'll probably need to look through the
//      documentation for this one.)
//  -  a computed property called `totalPrice`, equal to the sum of
//      the `orderPrice` values for everything in the cart); it should be
//      recalculated any time an Order is added to the cart, removed from the
//      cart, or modified.

const Cart = Order.extend({
  orders: Ember.A([]),

  addToCart: function(item){
    this.get('orders').pushObject(Order.create(item));
  },

  totalPrice: Ember.computed('orderPrice', 'orders', function(){
    let items = this.get('orders');
    let total = 0;
    items.forEach((item) => total += item.get('orderPrice'))
    return total;
  })
});

let order1 = Order.create({item: "hat", quantity: 2, unit_price: 5});
let order2 = Order.create({item: "lamp", quantity: 1, unit_price: 20});
let order3 = Order.create({item: "hand", quantity: 2, unit_price: 5});

let mycart = Cart.create();
mycart.addToCart(order1);
mycart.addToCart(order2);
mycart.addToCart(order3);

mycart.get('totalPrice')

// Once you've created the necessary Ember Classes, create a new Cart instance,
//  and fill that cart up with three new product orders having the following
//  quantities, product names, and prices:
//  -  Order 1 : 2 hats ($5 each)
//  -  Order 2 : 1 desk lamp ($20 each)
//  -  Order 3 : 3 hand towels ($8 each)
