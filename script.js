const validCredentials = {
  username: "admin",
  password: "admin123"
};

function login() {
  const user = document.getElementById("admin-user").value.trim();
  const pass = document.getElementById("admin-pass").value.trim();
  const remember = document.getElementById("remember-me").checked;
  const status = document.getElementById("login-status");

  if (user === validCredentials.username && pass === validCredentials.password) {
    if (remember) {
      localStorage.setItem("loggedIn", "true");
    }
    showAdminPanel();
  } else {
    status.innerText = "Invalid username or password!";
  }
}

function showAdminPanel() {
  document.getElementById("admin-panel").style.display = "block";
  document.getElementById("login-box").style.display = "none";
  loadProducts();
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.reload();
}

function addProduct() {
  const name = document.getElementById("product-name").value;
  const category = document.getElementById("product-category").value;
  const price = document.getElementById("product-price").value;
  const qty = document.getElementById("product-qty").value;
  const desc = document.getElementById("product-desc").value;

  if (!name || !category || price <= 0 || qty <= 0 || !desc) {
    alert("Please enter valid product details.");
    return;
  }

  const product = { name, category, price, qty, desc };
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  clearInputs();
}

function loadProducts() {
  const table = document.getElementById("product-table");
  table.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((p, index) => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.qty}</td>
        <td>${p.desc}</td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function editProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products[index];
  document.getElementById("product-name").value = p.name;
  document.getElementById("product-category").value = p.category;
  document.getElementById("product-price").value = p.price;
  document.getElementById("product-qty").value = p.qty;
  document.getElementById("product-desc").value = p.desc;
  deleteProduct(index);
}

function clearInputs() {
  document.getElementById("product-name").value = "";
  document.getElementById("product-category").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-qty").value = "";
  document.getElementById("product-desc").value = "";
}

window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    showAdminPanel();
  }
};
