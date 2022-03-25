let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:'Benylin Dry Cough 100ml',
        tag:'Benylin',
        price:810,
        incart:0
    },
    {
        name:'Prednisolone Oral Route',
        tag:'Prednisolone',
        price:550,
        incart:0
    },
    {
        name:'Fluticasone Nasal Route',
        tag:'Fluticasone',
        price:740,
        incart:0
    },
    {
        name:'Glyburide-Metformin HCL',
        tag:'Metformin',
        price:3499,
        incart:0
    },

    {
        name:'Omeprazole And Sodium Bicarbonate',
        tag:'Omeprazole',
        price:680,
        incart:0

    },
    {
        name:'Losartan-Hydrochlorothiazide',
        tag:'Losartan',
        price:370,
        incart:0
    },
    {
        name:'Albuterol Sulfate 90 Mcg',
        tag:'Albuterol',
        price:220,
        incart:0
    },
    {
        name:'Lisinopril 20 Mg-Hydrochlorothiazide',
        tag:'Lisinopril',
        price:435,
        incart:0
    }
];

//Looping through all products' click events
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalcost(products[i]);
    })
}

// Incrementing cart numbers
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}

//Increasing item quantities while inside cart
function cartNumbers(product){

    let productNumbers=localStorage.getItem('cartNumbers');

    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
   setItems(product);
}
function setItems(product){
    let cartitems= localStorage.getItem("productsInCart");
    cartitems= JSON.parse(cartitems);
    if(cartitems != null){
        if(cartitems[product.tag] == undefined){
            cartitems={
                ...cartitems,
                [product.tag]:product
            }
        }
        cartitems[product.tag].incart += 1;
    }
    else{
        product.incart = 1;
        cartitems = {
            [product.tag]:product

        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
}

//calculate total cost of cart items
function totalcost(product){
    // console.log("the product price is", product.price);
    let cartcost=localStorage.getItem('totalcost');

    // console.log("my cart is ", cartcost);
    // console.log(typeof cartcost);
    if(cartcost !=null){
       cartcost= parseInt(cartcost);
       localStorage.setItem("totalcost", cartcost+product.price);
    }
    else{
        localStorage.setItem("totalcost", product.price);
    }
}

//While in cart, decreasing quantities on clicking up arrow: 
function decr(e){
    let cartitems= JSON.parse(localStorage.getItem("productsInCart"));
    let cartcost=localStorage.getItem('totalcost');
    if(cartitems[e.id].incart > 1){
        cartitems[e.id].incart--;
        cartcost = parseInt(cartcost) - parseInt(cartitems[e.id].price);
        console.log(cartitems[e.id].incart, cartcost);
    }else{
        cartcost = parseInt(cartcost) - parseInt(cartitems[e.id].price);
        localStorage.setItem('cartNumbers', parseInt(localStorage.getItem('cartNumbers'))-1);
        document.querySelector('.cart span').innerText = localStorage.getItem('cartNumbers');
        delete cartitems[e.id];
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
    localStorage.setItem('totalcost', cartcost);
    displaycart();
}

//While in cart, increasing quantities on clicking up arrow:
function incr(e){
    let cartitems= JSON.parse(localStorage.getItem("productsInCart"));
    let cartcost=localStorage.getItem('totalcost');
    cartitems[e.id].incart++;
    cartcost = parseInt(cartitems[e.id].price) + parseInt(cartcost);
    console.log(cartitems[e.id].incart);
    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
    localStorage.setItem('totalcost', cartcost);
    displaycart();
}

function displaycart(){
    let cartitems= localStorage.getItem("productsInCart");
    cartitems = JSON.parse(cartitems);
    let productcontainer =document.querySelector("tbody");
    let cartcost=localStorage.getItem('totalcost');
    // console.log(cartcost);
    if(cartitems && productcontainer){
        productcontainer.innerHTML = '';
        Object.values(cartitems).map((item, index) =>{
            productcontainer.innerHTML +=`
            <tbody >
                        <tr>
                            <td>
                                <div class="main">
                                    <div class="d-flex">
                     <!--W=145 H=98--> <img src="./images/new-images${item.tag}.jpeg">
                                    </div>
                                    <div class="des">
                                        <p>${item.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h6>${item.price}</h6>
                            </td>
                            <td>
                                <div class="counter">
                                    <i id="${item.tag}" onclick = "decr(this)" class="fa fa-angle-down"></i>
                                    <input class="input-number"type="text"
                                    value="${item.incart}"min="0"max="10">
                                    <i id="${item.tag}" onclick ="incr(this)" class="fa fa-angle-up"></i>
                                </div>
                            </td>
                            <td>
                                <h6>Ksh.${item.incart * item.price}</h6>
                            </td>
                        </tr>
             `
             });
             if(cartcost != 0){
                productcontainer.innerHTML +=`
                <div class="col-lg-4 offset-lg-4">
                <div class="checkout">
                    <ul>
                        <li class="subtotal">subtotal
                            <span>Ksh.${cartcost}</span>
                        </li>
                        <li class="cart-total">Total
                        <span>Ksh.${cartcost}</span></li>
                    </ul>
                    <a href="shipping.html"class="proceed-btn">Proceed to Checkout</a>
                </div>
                </div>`
            }else{
                productcontainer.innerHTML = '';
            }
    }
}
onLoadCartNumbers();
displaycart();


    //confirmation message on submitting 
// let firstName = document.getElementById("shipping-first-name"); 
// let town = document.getElementById("shipping-city"); 
// let displayMessage = document.getElementById("confirmation-message");

// if (($("shipping-first-name").val() && $("shipping-last-name").val() && $("shipping-phone").val() && $("shipping-city").val()) !== ""){
//     displayMessage.innerHTML = `<p>${firstName}, order will be delivered to ${town}.</p>`
// } else {
//     displayMessage = `<p>Please fill all the required details.</p>`
// }