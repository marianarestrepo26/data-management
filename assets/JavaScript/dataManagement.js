// Obtiene referencias a los elementos del DOM
const btnAdd = document.getElementById("add-product-btn");

const productNameElement = document.getElementById("product-name");
const productPriceElement = document.getElementById("product-price");
const productCategoryElement = document.getElementById("product-category");

// Carga productos desde localStorage o iniciar vacío
let products = JSON.parse(localStorage.getItem("products")) || [];

// Limpia los campos del formulario
function clearProduct() {
    productNameElement.value = ""
    productPriceElement.value = ""
    productCategoryElement.value = productCategoryElement.options[0].value;
}

// Muestra la lista de productos
function showProducts(products){
    const objectDisplay = document.getElementById("objects-display");   
    const objectCounter = document.getElementById("object-counter");
    const totalProducts = document.getElementById("total-products")
    
    const elementProducts = products.map((product) => `<p>${product.name}, ${product.price}, ${product.category}</p>`).join('');
    objectDisplay.innerHTML = elementProducts;
    objectCounter.textContent = `${products.length} items`
    totalProducts.textContent = products.length
}

// Muestra productos únicos
function setProducts(products){
    const setDisplay = document.getElementById("sets-display"); 
    const setCounter = document.getElementById("set-counter");
    const totalset = document.getElementById("unique-products");

    // Crea un set de nombres únicos
    const setProduct = new Set(products.map( product => `<p>${product.name}</p>`));

    setDisplay.innerHTML = [...setProduct].join('')
    setCounter.textContent = `${setProduct.size} items`;
    totalset.textContent = setProduct.size
}

// Muestra categorías únicas
function setCategory(){
    const categoryDisplay = document.getElementById("category-display");
    const categoryCounter = document.getElementById("category-counter");
    const totalCategories = document.getElementById("total-categories");

    // Crea un set de categorias únicas
    const setCategories = new Set(products.map( product => `<p>${product.category}</p>`));

    console.log(setCategories)
    categoryDisplay.innerHTML = [...setCategories].join('')
    categoryCounter.textContent = `${setCategories.size} items`
    totalCategories.textContent = setCategories.size
}

// Busca productos por nombre
function searchProduct() {
    const search = document.getElementById("search").value;
    const productsFiltered = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    showProducts(productsFiltered);
    setProducts(productsFiltered);
}

// Permite buscar con la tecla Enter
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log("Boton")
        searchProduct()
    }
})

// Muestra datos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    showProducts(products);
    setProducts(products);
    setCategory();
});

// Agrega productos al hacer clic en el botón
btnAdd.addEventListener("click", () => {
    const productName = productNameElement.value;
    const productPrice = +productPriceElement.value;
    const productCategory = productCategoryElement.value;
    
    //Validaciones de entrada
    if (productName === "") {
        alert("Error, you must enter a name")
        clearProduct()
        return
    }

    //Válida el ingreso de 1 o más números y permite números despues de un punto para volverlos flotantes
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
    
    // Crear objeto producto
    const product = {
        "name" : productName,
        "price" : productPrice,
        "category" : productCategory
    };

    // Agrega producto al array y guarda en localStorage
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    
    // Limpiar formulario despues de hacer clic
    clearProduct()
    showProducts(products)
    setProducts(products)
    setCategory()
})