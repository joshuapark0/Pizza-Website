let cart = [];
let selectedPizza = '';
let totalPrice = 0;

const pizzaPrices = {
    Pepperoni: 9,
    Cheese: 8,
    Hawaiian: 10,
    Meatlovers: 11
};

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function navigateToMenu(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    const pizzasSection = document.querySelector('#pizzas'); // Select the pizzas section
    if (pizzasSection) {
      pizzasSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the pizzas section
    }
}

function navigateToHome(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    const pizzasSection = document.querySelector('.header-container'); // Select the pizzas section
    if (pizzasSection) {
      pizzasSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the pizzas section
    }
}

function openModal(pizza) {
    selectedPizza = pizza;
    document.getElementById('modalPizzaTitle').textContent = capitalize(pizza) + ' Pizza';
    let currentPrice = pizzaPrices[pizza];
    document.getElementById('currentPrice').textContent = currentPrice;
    document.getElementById('pizzaModal').style.display = 'block';

    const crustOption = document.getElementById('crust');
    const sizeOption = document.getElementById('size');
    const quantityInput = document.getElementById('quantity');

    const updatePrice = () => {
        const crustPrice = parseInt(crustOption.options[crustOption.selectedIndex].dataset.price) || 0;
        const sizePrice = parseInt(sizeOption.options[sizeOption.selectedIndex].dataset.price) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        const totalPrice = (currentPrice + crustPrice + sizePrice) * quantity;
        // Display the price in the modal
        document.getElementById('currentPrice').textContent = totalPrice.toFixed(2);
    };

    updatePrice();
    // need event listener as we learned without it the price is only set when opening modal
    crustOption.addEventListener('change', updatePrice);
    sizeOption.addEventListener('change', updatePrice);
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateModalPrice();
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updateModalPrice();
    }
}

function updateModalPrice() {
    const crustOption = document.getElementById('crust');
    const sizeOption = document.getElementById('size');
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const currentPrice = pizzaPrices[selectedPizza];
    const crustPrice = parseInt(crustOption.options[crustOption.selectedIndex].dataset.price) || 0;
    const sizePrice = parseInt(sizeOption.options[sizeOption.selectedIndex].dataset.price) || 0;
    const totalPrice = (currentPrice + crustPrice + sizePrice) * quantity;
    document.getElementById('currentPrice').textContent = totalPrice.toFixed(2);
}

function addToCart() {
    const crustOption = document.getElementById('crust');
    const sizeOption = document.getElementById('size');
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const crust = crustOption.options[crustOption.selectedIndex].textContent;
    const size = sizeOption.options[sizeOption.selectedIndex].textContent;
    const price = parseFloat(document.getElementById('currentPrice').textContent);

    cart.push({
        pizza: selectedPizza,
        crust,
        size,
        quantity,
        price
    });

   
    // Update total price in the cart
    displayCartItems();
    totalPrice += price;
    document.getElementById('totalPrice').textContent = 'Total: $'+totalPrice.toFixed(2); // Update the cart total
    displayCartItems();
    updateCartCount();
    closeModal();
    
}

// Update cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cart.length;
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        // Create content for each cart item
        itemElement.innerHTML = `
            <p><strong>${item.pizza} Pizza - $${item.price.toFixed(2)}</strong></p>
            <p>Crust: ${item.crust}</p>
            <p>Size: ${item.size}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(itemElement); // Add item to cart section
    });
}

function removeFromCart(index) {
    const item = cart[index];
    totalPrice -= item.price;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2); // Update the cart total
    cart.splice(index, 1);
    displayCartItems();
    updateCartCount(); // Update cart count
}

function closeModal() {
    document.getElementById('pizzaModal').style.display = 'none';
}

document.getElementById('checkoutButton').addEventListener('click', function() {
    alert('Checkout functionality is not implemented yet.');
})

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

