var prods = JSON.parse(localStorage.getItem("products")) || [];
// console.log(prods);
var productsContainer = document.getElementById("product-table-container");
var tableBody = document.getElementById("table-body");
var warningmessage = document.getElementById("warningmsg");
var pname = document.getElementById("prodName");
var pcat = document.getElementById("prodCat");
var pprice = document.getElementById("prodPrice");
var pdesc = document.getElementById("prodDesc");
var btn = document.getElementById("bt1");
var i;

class Product {
  constructor(name, cat, price, dec) {
    this.name = name;
    this.cat = cat;
    this.price = price;
    this.dec = dec;
  }
  edit(name, cat, price, dec) {
    this.name = name;
    this.cat = cat;
    this.price = price;
    this.dec = dec;
  }
}

class Products {
  constructor() {
    this.allproducts = [];
  }
  addProduct(newp) {
    this.allproducts.push(newp);
    return newp;
  }
  numberOfProducts() {
    return this.allproducts.length;
  }
}
let products = new Products();

prods.forEach((element) => {
  let product = new Product(
    element.name,
    element.cat,
    element.price,
    element.dec
  );
  products.addProduct(product);
//   console.log(element.name);
});

function handle() {
  if (products && products.numberOfProducts() !== 0) {
    console.log("Products are available");
    productsContainer.classList.remove("d-none");
    productsContainer.classList.add("d-block");
    warningmessage.classList.add("d-none");
    warningmessage.classList.remove("d-block");
    var rows = "";
    for (let i = 0; i < products.numberOfProducts(); i++) {
      rows += `
            <tr>
                <th>${i + 1}</th>
                <td>${products.allproducts[i].name}</td>
                <td>${products.allproducts[i].cat}</td>
                <td>${products.allproducts[i].price}</td>
                <td>${products.allproducts[i].dec}</td>
                <td>
                    <button class="btn btn-outline-success " onclick="updaterow(${i})">
                    <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-danger" onclick="deleterow(${i})">
                    <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
            `;
    }
    tableBody.innerHTML = rows;
  } else {
    console.log("Products arenot available");

    warningmessage.classList.remove("d-none");
    warningmessage.classList.add("d-block");
    productsContainer.classList.add("d-none");
    productsContainer.classList.remove("d-block");
  }
}
handle();

function addproduct() {
  if (
    pname.value === "" ||
    pcat.value === "" ||
    pprice.value === "" ||
    pdesc.value === ""
  ) {
    alert("Please fill out all required fields before adding a product.");
    return;
  }
  var newproduct = new Product(
    pname.value,
    pcat.value,
    pprice.value,
    pdesc.value
  );
  console.log(newproduct);
  if (btn.innerHTML === "add product") {
    products.addProduct(newproduct);
  } else {
    products.allproducts[i].edit(
      pname.value,
      pcat.value,
      pprice.value,
      pdesc.value
    );
    btn.innerHTML = "add product";
  }
  localStorage.setItem("products", JSON.stringify(products.allproducts));
  clearboxes();
  handle();
}

function updaterow(index) {
  console.log("updaterow");
  pname.value = products.allproducts[index].name;
  pcat.value = products.allproducts[index].cat;
  pdesc.value = products.allproducts[index].dec;
  pprice.value = products.allproducts[index].price;
  btn.innerHTML = "update";
  console.log("Element updated successfully:", products.allproducts);
  i = index;
  handle();
}
function deleterow(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("deleterow");
      products.allproducts.splice(index, 1);
      console.log("Element deleted successfully:", products.allproducts);
      localStorage.setItem("products", JSON.stringify(products.allproducts));
      handle();

      Swal.fire("Deleted!", "The item has been deleted.", "success");
    }
  });
}
function clearboxes() {
  pname.value = "";
  pprice.value = "";
  pdesc.value = "";
  pcat.value = "";
}
