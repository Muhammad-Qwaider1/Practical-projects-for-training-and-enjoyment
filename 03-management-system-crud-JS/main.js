let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let tmpIndex;
let searchMode = "title";

function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
    return result;
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (title.value.trim() === "" || price.value.trim() === "" || category.value.trim() === "") {
    alert("Please fill in the required fields (Title, Price, Category)");
    return;
  }

  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.innerHTML,
    count: count.value || 1,
    category: category.value.toLowerCase(),
  };

  if (submit.innerHTML === "Create") {
    let itemCount = +newPro.count > 1 ? +newPro.count : 1;
    for (let i = 0; i < itemCount; i++) {
      dataPro.push({ ...newPro, count: 1 });
    }
  } else {
    dataPro[tmpIndex] = newPro;
    submit.innerHTML = "Create";
    submit.style.background = "#2D5A27";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
});

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "#a00d02";
}

function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
      <td><button class="update" onclick="updateData(${i})">Update</button></td>
      <td><button class="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDeleteAll.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all products?")) {
    localStorage.clear();
    dataPro.splice(0);
    showData();
  }
}

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  getTotal();

  submit.innerHTML = "Update Product";
  submit.style.background = "#186103";
  tmpIndex = i;

  scroll({ top: 0, behavior: "smooth" });
}

function getSearchMode(id) {
  let searchInput = document.getElementById("search");
  if (id === "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  searchInput.placeholder = "Search By " + searchMode;
  searchInput.focus();
  searchInput.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  let val = value.toLowerCase();

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode === "title") {
      if (dataPro[i].title.includes(val)) {
        table += renderRow(i);
      }
    } else {
      if (dataPro[i].category.includes(val)) {
        table += renderRow(i);
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

function renderRow(i) {
  return `
    <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
      <td><button class="update" onclick="updateData(${i})">Update</button></td>
      <td><button class="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>
  `;
}

showData();