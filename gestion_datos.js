const btnAdd = document.getElementById("add-product-btn");

const products = [
    {
        "name": "Milk",
        "price": 5000,
        "category": "Dairy"
    }
];



const productNameElement = document.getElementById("product-name");
const productPriceElement = document.getElementById("product-price");
const productCategoryElement = document.getElementById("product-category");

function clearProduct() {
    productNameElement.value = ""
    productPriceElement.value = ""
    productCategoryElement.value = productCategoryElement.options[0].value;
}

function onClick() {
    const productName = productNameElement.value;
    const productPrice = +productPriceElement.value;
    const productCategory = productCategoryElement.value;

    if (productName === "") {
        alert("Error, you must enter a name")
        clearProduct()
        return
    }
    if (productPrice === "") {
        alert("Error, you must enter a price")
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

    clearProduct()
    showProducts()
    setProducts()
    setCategory()

}

function showProducts(){
    const objectDisplay = document.getElementById("objects-display");   
    const objectCounter = document.getElementById("object-counter");

    const elementProducts = products.map((product) => `<p>${product.name}, ${product.price}, ${product.category}</p>`).join('');
    console.log(products.length)
    objectDisplay.innerHTML = elementProducts;
    objectCounter.textContent = `${products.length} items`
    
}


function setProducts(){
    const setDisplay = document.getElementById("sets-display"); 
    const setCounter = document.getElementById("set-counter")
    
    const setProduct = new Set(products.map( product => `<p>${product.name}</p>`));

    console.log(setProduct)
    setDisplay.innerHTML = [...setProduct].join('')
    setCounter.textContent = `${setProduct.size} items`
}

function setCategory(){
    const categoryDisplay = document.getElementById("category-display");
    const categoryCounter = document.getElementById("category-counter")

    const setCategories = new Set(products.map( product => `<p>${product.category}</p>`));

    console.log(setCategories)
    categoryDisplay.innerHTML = [...setCategories].join('')
    categoryCounter.textContent = `${setCategories.size} items`
}

document.addEventListener("DOMContentLoaded", () => {
    showProducts();
    setProducts();
    setCategory();
});

btnAdd.addEventListener("click", onClick)