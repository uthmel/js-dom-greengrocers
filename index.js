const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: []
};

function showStoreItems(type, sortBy) {
  let filteredItems;
  
  if (type === 'all') {
    filteredItems = state.items;
  } else {
    filteredItems = state.items.filter(item => item.type === type);
  }

  if (sortBy === 'alphabetically') {
    filteredItems = state.items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'price') {
    filteredItems = state.items.sort((a, b) => a.price - b.price);
  }
  
  const storeList = document.querySelector('.store--item-list');
  storeList.innerHTML = ``;

  filteredItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      </div>
      <button>Add item to cart</button> 
    `;

    li.querySelector('button').addEventListener('click', () => addToCart(item));

    storeList.appendChild(li);
  })
}

function addToCart(item) {
  const cartItem = state.cart.find(i => i.id === item.id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    state.cart.push({...item, quantity: 1})
  }
  showCartItems();

} 

function showCartItems() {
  const cartList = document.querySelector('.cart--item-list');
  cartList.innerHTML = '';
  state.cart.forEach(item => {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
      <p>${item.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${item.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    `;

    listItem.querySelector('.add-btn').addEventListener('click', () => itemQuantity(item, 1));
    listItem.querySelector('.remove-btn').addEventListener('click', () => itemQuantity(item, -1));

    cartList.appendChild(listItem);
  });

  totalCost();
}

function itemQuantity(item, valueChange) {
  item.quantity += valueChange;
  if (item.quantity === 0) {
    state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
   
  }
  showCartItems();
} 

function totalCost() {
  const totalElement = document.querySelector('.total-number');
  let total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  totalElement.textContent = `£${total.toFixed(2)}`
}


showStoreItems('all');
showCartItems();