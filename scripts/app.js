
// SELECT ELEMENTS

const productSession = document.querySelector(".cards-products");
const cartItems = document.querySelector(".cart-items");
const btnAddCart = document.getElementsByClassName("btn-add-to-card");

const sectionCart = document.querySelector(".section-cart");
const sectionTotal = document.querySelector(".section-total");


const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const subtotalEl = document.querySelector(".subtotal");
const discont = document.querySelector(".discont")

const totalFinal = document.querySelector(".total-final");
const valueCupom = document.querySelector("input").value;
const cupomInfo = document.querySelector(".cupom-info");


let cart = [];
let discontPercentage = 0;


function hideSectionCartAndTotal() {

    sectionCart.classList.add("hide");
    sectionTotal.classList.add("hide");

}
console.log(cart)

if (cart.length == 0){

    
    hideSectionCartAndTotal();
}



function showSectionCartAndTotal() {

    sectionCart.classList.remove("hide");
    sectionTotal.classList.remove("hide");

}

// RENDER PRODUCTS

function renderProducts() {

    products.forEach((product) => {

        productSession.innerHTML += `

            <div class="card-product">

                <img class="img-item-card" src="/assets/${product.img}.jpeg" alt="">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="product-price">U$ ${product.price} </p>
                    
                    <button class="btn-add-to-card" onClick="addToCart(${product.id})">Buy</button>
                
                </div>

                
                </div> 
                `;
                
    });
}

renderProducts();

// CART ARRAY

function addToCart(id) {

    // check if product already exist in cart
    showSectionCartAndTotal();
    
    cartItems.scrollIntoView({ behavior: "smooth" });
    

    if (cart.some((item) => item.id === id)) {

        changeNumberOfUnits("plus", id);    
    } 
    else {

        const item = products.find((product) => product.id === id);

        cart.push({
        ...item,
        numberOfUnits: 1,
    });
    }

    updateCart();
}

function updateCart() {

    renderCartItems();
    renderSubtotal();
}

function changeNumberOfUnits(action, id) {

    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {

            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } 

            else if (action === "plus") {
                numberOfUnits++;
                console.log(numberOfUnits)
            }
        }

        return {
        ...item,
        numberOfUnits,
        };
    });

    updateCart();

}



//REMOVE ITEM FROM CART

function removeItemFromCart(id){

    // console.log(cart);

    cart = cart.filter((product) => product.id !== id);

    
    if (cart.length == 0) {
        hideSectionCartAndTotal();
    }
    
    renderCartItems();
    renderSubtotal();

}


// CUPOM

function checkCupom(userCupom) {

    // userCupom.toLowerCase()

    let validCupoms = [

        { id: 1, name: "a", desconto: 10 },
        { id: 2, name: "abc", desconto: 30 },
        { id: 3, name: "ganhei100", desconto: 100 },

    ];


    let cupomIsValid = validCupoms.find((elem) => elem.name == userCupom.toLowerCase());

    if (cupomIsValid == undefined || null ){

        alert("Cupom Inválido ou Expirado.")

        discontPercentage = 0
        renderSubtotal();
        cupomInfo.innerHTML = "";


    }

    else{

        alert(`Parabéns! \nVocê ganhou ${cupomIsValid.desconto}% de desconto.`);
        
        discontPercentage = cupomIsValid.desconto;
        console.log(discontPercentage);
        renderSubtotal()
        cupomInfo.innerHTML = ` - Você ganhou ${discontPercentage}% de desconto com o cupom: "${cupomIsValid.name}" `;

    }
}


// calculate and render subtotal

function renderSubtotal() {

    let totalPrice = 0,
    totalItems = 0;
    let total = 0;
    let totalDiscont = 0

    cart.map((item) => {

        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;

        totalDiscont = totalPrice * (discontPercentage / 100)
        console.log(totalDiscont);

        // if (totalItems > 4) {totalDiscont = 1;}

        total = totalPrice - totalDiscont;


    });

    subtotalEl.innerHTML = `Subtotal (${totalItems} items): U$ ${totalPrice.toFixed(2)}`;

    discont.innerHTML = `Discount: U$ -${totalDiscont.toFixed(2)}`;

    totalFinal.innerHTML = `Total: U$ ${total.toFixed(2)}`;

}




function renderCartItems() {

    cartItems.innerHTML = ""; // clear cart element
    


    cart.forEach((item) =>  {
        
        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <img class="img-item-cart" src="/assets/${
                    item.img
                }.jpeg" alt="${item.name}">
                    

            </div>
                    
                    
            <div class="units-item">
                    
                <h3>${item.name}</h3>
                <p class="cart-item-value">U$ ${item.price} x (${
                    item.numberOfUnits
                    }) Units</p> 

                <p class="cart-item-value">Total: U$ ${
                    item.price * item.numberOfUnits
                }  </p>
                

                <div class="container-btn-minus-plus-remove">

                    
                    <img class="icon-minus-plus-remove icon-minus" src="/assets/minus.svg" alt="minus" 
                        onclick="changeNumberOfUnits('minus', ${item.id})">

                    <span class="number-units">${item.numberOfUnits}</span>

                    <img class="icon-minus-plus-remove icon-plus" src="/assets/plus.svg" alt="minus" 
                        onclick="changeNumberOfUnits('plus', ${item.id})"> 

                    <img class="icon-minus-plus-remove icon-trash " src="/assets/trash.svg" alt="trash" 
                        onclick="removeItemFromCart(${item.id})">

                
                </div>

            </div>

        </div>
            
        `;
    });
}
