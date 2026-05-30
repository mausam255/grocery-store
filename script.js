//alert("JS Loaded");
console.log("Grocery E-Shop Started");

const products = [
    { id: 1, name: "Apple", price: 120, category: "fruits", image: "image/Apple.jfif" },
    { id: 2, name: "Banana", price: 50, category: "fruits", image: "image/Banana.jfif" },
    { id: 3, name: "Milk", price: 60, category: "dairy", image: "image/Milk.jfif" },
    { id: 4, name: "Bread", price: 40, category: "bakery", image: "image/Bread.jfif" },
    { id: 5, name: "Rice", price: 80, category: "grocery", image: "image/Rice.jfif" },
    { id: 6, name: "Sugar", price: 45, category: "grocery", image: "image/Sugar.jfif" },
    { id: 7, name: "Eggs", price: 70, category: "dairy", image: "image/Eggs.jfif" },
    { id: 8, name: "Vegetables", price: 30, category: "vegetables", image: "image/Vegetable.jfif" },
    { id: 9, name: "Fruits", price: 90, category: "fruits", image: "image/Fruits.jfif" },
    { id: 10, name: "Juice", price: 110, category: "drinks", image: "image/Juice.jfif" },
    { id: 11, name: "Amul Butter", price: 75, category: "dairy", image: "image/Amul Butter.jfif" },
    { id: 12, name: "Cheese", price: 85, category: "dairy", image: "image/Cheese.jfif" },
    { id: 13, name: "Coffee", price: 150, category: "drinks", image: "image/Coffee.jfif" },
    { id: 14, name: "Tea", price: 100, category: "drinks", image: "image/Tea.jfif" },
    { id: 15, name: "Dark Chocolate", price: 120, category: "snacks", image: "image/D Chocolate.jfif" },
    { id: 16, name: "Water", price: 20, category: "drinks", image: "image/Water.jfif" },
    { id: 17, name: "Ice Cream", price: 90, category: "dairy", image: "image/ICE-Cream.jfif" },
    { id: 18, name: "Cookies", price: 70, category: "snacks", image: "image/Cookies.jfif" },
    { id: 19, name: "Chips", price: 50, category: "snacks", image: "image/Chips.jfif" },
    { id: 20, name: "Sauce", price: 30, category: "grocery", image: "image/Sauce.jfif" },
    { id: 21, name: "Spices", price: 25, category: "grocery", image: "image/Spices.jfif" },
    { id: 22, name: "Maggie", price: 20, category: "snacks", image: "image/Maggie.jfif" },
    { id: 23, name: "Oats", price: 70, category: "grocery", image: "image/Oats.jfif" },
    { id: 24, name: "Chicken", price: 80, category: "meat", image: "image/Chicken.jfif" },
    { id: 25, name: "Fish", price: 90, category: "meat", image: "image/Fish.jfif" }
];

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Display Products */
function displayProducts(productList){

    productContainer.innerHTML = "";

    productList.forEach(product => {

        productContainer.innerHTML += `
        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

            </div>

        </div>
        `;
    });
}

displayProducts(products);
updateCart();

/* Open Cart */
if(cartBtn){
    cartBtn.addEventListener("click", function(e){
        e.preventDefault();
        cartSidebar.classList.add("active");
    });
}

/* Close Cart */
if(closeCart){
    closeCart.addEventListener("click", function(){
        cartSidebar.classList.remove("active");
    });
}

/* Add To Cart */
function addToCart(id){

    const product = products.find(item => item.id === id);

    if(!product) return;

    const existingItem = cart.find(item => item.id === id);

    if(existingItem){
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    }
    else{
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    const toast = document.getElementById("toast");

    if(toast){

        toast.innerHTML = `✅ ${product.name} Added To Cart`;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    }
}

/* Update Cart */
function updateCart(){

    if(!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * (item.quantity || 1);

  cartItems.innerHTML += `
<div class="cart-item">

    <div>
    <h4>${item.name}</h4>
    <p>₹${item.price}</p>

    <div class="qty-box">
        <button onclick="decreaseQty(${index})">➖</button>

        <span>${item.quantity || 1}</span>

        <button onclick="increaseQty(${index})">➕</button>
    </div>
</div>

    <button class="remove-btn"
        onclick="removeFromCart(${index})">
        ❌
    </button>

</div>
`;
    });

    document.getElementById("cart-count").textContent = cart.length;
    cartTotal.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Remove From Cart */
function removeFromCart(index){
    cart.splice(index,1);
    updateCart();
}
function increaseQty(index){

    cart[index].quantity++;

    updateCart();
}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);
    }

    updateCart();
}

/* Search */
if(searchInput){
    searchInput.addEventListener("keyup", function(){

        const value = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );

        displayProducts(filteredProducts);
    });
}

const checkoutBtn = document.getElementById("checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", ()=>{

        if(cart.length === 0){

            alert("Cart is Empty!");

            return;
        }

        const paymentMethod = prompt(
    "Select Payment Method:\n1. UPI\n2. Credit Card\n3. Cash On Delivery"
);

if(paymentMethod){

    alert(
        "✅ Payment Successful!\n\nOrder ID: #" +
        Math.floor(Math.random() * 100000)
    );

    cart = [];
    updateCart();
    localStorage.removeItem("cart");
}

        cart = [];

        updateCart();

        localStorage.removeItem("cart");
    });
}

function filterProducts(category){

    if(category === "all"){
        displayProducts(products);
        return;
    }

    const filtered = products.filter(
        product => product.category === category
    );

    displayProducts(filtered);
}

/* Dark Mode */

const themeBtn = document.getElementById("theme-btn");

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme", "dark");

        themeBtn.textContent = "☀️";

    }else{

        localStorage.setItem("theme", "light");

        themeBtn.textContent = "🌙";
    }
});

function checkout(){
    document.getElementById("payment-modal").style.display = "flex";
}

function placeOrder(method){

    alert("✅ Order Placed Successfully\nPayment Method: " + method);

    document.getElementById("payment-modal").style.display = "none";

    cart = [];
    updateCart();
    localStorage.removeItem("cart");
}