const btnAdd = document.getElementById("add-product-btn");

const productNameElement = document.getElementById("product-name");
const productPriceElement = document.getElementById("product-price");
const productCategoryElement = document.getElementById("product-category");

let products = JSON.parse(localStorage.getItem("products")) || [];

function clearProduct() {
    productNameElement.value = ""
    productPriceElement.value = ""
    productCategoryElement.value = productCategoryElement.options[0].value;
}

function showProducts(products){
    const objectDisplay = document.getElementById("objects-display");   
    const objectCounter = document.getElementById("object-counter");
    const totalProducts = document.getElementById("total-products")
    
    const elementProducts = products.map((product) => `<p>${product.name}, ${product.price}, ${product.category}</p>`).join('');
    objectDisplay.innerHTML = elementProducts;
    objectCounter.textContent = `${products.length} items`
    totalProducts.textContent = products.length
}

function setProducts(products){
    const setDisplay = document.getElementById("sets-display"); 
    const setCounter = document.getElementById("set-counter");
    const totalset = document.getElementById("unique-products");

    const setProduct = new Set(products.map( product => `<p>${product.name}</p>`));

    setDisplay.innerHTML = [...setProduct].join('')
    setCounter.textContent = `${setProduct.size} items`;
    totalset.textContent = setProduct.size
}

function setCategory(){
    const categoryDisplay = document.getElementById("category-display");
    const categoryCounter = document.getElementById("category-counter");
    const totalCategories = document.getElementById("total-categories")

    const setCategories = new Set(products.map( product => `<p>${product.category}</p>`));

    console.log(setCategories)
    categoryDisplay.innerHTML = [...setCategories].join('')
    categoryCounter.textContent = `${setCategories.size} items`
    totalCategories.textContent = setCategories.size
}

function searchProduct() {
    const search = document.getElementById("search").value;
    const productsFiltered = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    showProducts(productsFiltered);
    setProducts(productsFiltered);
}
 
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log("Boton")
        searchProduct()
    }
})

document.addEventListener("DOMContentLoaded", () => {
    showProducts(products);
    setProducts(products);
    setCategory();
});

btnAdd.addEventListener("click", () => {
    const productName = productNameElement.value;
    const productPrice = +productPriceElement.value;
    const productCategory = productCategoryElement.value;
    
    if (productName === "") {
        alert("Error, you must enter a name")
        clearProduct()
        return
    }
    if (productPrice === "" || !/^\d+(\.\d+)?$/.test(productPrice) || productPrice < 0) {
    alert("Error, you must enter a valid price")
    clearProduct()
    return
}
    if (productCategory === "") {
        alert("Error, you must enter a category")
        clearProduct()
        return
    }
    
    
    const product = {
        "name" : productName,
        "price" : productPrice,
        "category" : productCategory
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    
    clearProduct()
    showProducts(products)
    setProducts(products)
    setCategory()
})