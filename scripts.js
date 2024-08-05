// Cart management object
const cart = {
    items: [],

    // Add item to the cart
    addItem(productName) {
        this.items.push(productName);
        this.saveCart();
        this.displayCart();
        this.showNotification(productName);
    },

    // Save cart items to local storage
    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    // Load cart items from local storage
    loadCart() {
        const savedItems = localStorage.getItem('cartItems');
        if (savedItems) {
            this.items = JSON.parse(savedItems);
        }
        this.displayCart();
    },

    // Display cart items
    displayCart() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = ''; // Clear existing content

        this.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.textContent = item;

            // Remove button for each item
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-btn';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                this.removeItem(index);
            });

            itemElement.appendChild(removeButton);
            cartElement.appendChild(itemElement);
        });
    },

    // Remove item from the cart
    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.displayCart();
    },

    // Show notification for added item
    showNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${productName} has been added to your cart!`;

        document.body.appendChild(notification);

        // Animate notification
        setTimeout(() => {
            notification.classList.add('fade-out');
        }, 2000);

        // Remove notification from DOM
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }
};

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    cart.loadCart();
});

// Example usage
function addToCart(productName) {
    cart.addItem(productName);
}

// You can add more JavaScript functions here for additional functionality
