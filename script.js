document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('login-link');
  const nav = document.querySelector('nav');

  // === Handle Login Form Submission ===
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const key = `user_${username}`;
      const storedUser = localStorage.getItem(key);

      if (!storedUser) {
        alert('User not found. Please register.');
        return;
      }

      const userData = JSON.parse(storedUser);

      if (userData.password === password) {
        localStorage.setItem('loggedInUser', username); // Store logged-in user
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        alert('Incorrect password!');
      }
    });
  }

  // === Handle Register Form Submission ===
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('new-username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const key = `user_${username}`;
      const existingUser = localStorage.getItem(key);

      if (existingUser) {
        alert('User already exists. Please login.');
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem(key, JSON.stringify(newUser)); // Store new user in localStorage

      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    });
  }

  // === Handle Login/Logout Button ===
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loginLink) {
    if (loggedInUser) {
      loginLink.textContent = 'Logout';
      loginLink.href = '#';
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedInUser'); // Remove logged-in session
        alert('Logged out successfully!');
        window.location.href = 'login.html'; // Redirect to login page
      });
    }
  }

  // === Optional: Display Welcome Message ===
  if (loggedInUser && nav) {
    const welcome = document.createElement('span');
    welcome.innerHTML = `Welcome, <strong>${loggedInUser}</strong>`;
    welcome.style.marginLeft = '10px';
    nav.appendChild(welcome);
  }
});

// === Add to Cart Function ===
function addToCart(productName, productPrice, qtyInputId, productImage) {
  const quantity = parseInt(document.getElementById(qtyInputId).value);

  if (quantity > 0) {
    const product = {
      name: productName,
      price: productPrice,
      quantity,
      image: productImage
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += quantity; // If product exists, increase the quantity
    } else {
      cart.push(product); // If product doesn't exist, add new product to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    alert(`${quantity} x ${productName} added to the cart!`);
  } else {
    alert("Please select a valid quantity.");
  }
}

// === Checkout Function ===
function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`You have ${cart.length} item(s) in your cart. Proceeding to checkout.`);
  }
}
