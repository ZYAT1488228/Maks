import { cart } from '../cart/cart.js';

const createMarkup = () => {
    let markup = '';
    let number = 1;
    for (const item of cart.items) {
        markup += `
        <li class="cartListItem">
        <div class="cartItemsFlex">
            <span>${number}. <b>Title:</b> ${item.title}</span>
            <span><b>Price:</b> ${item.price} UAH</span>
        </div>
        </li>
        `
        number += 1;
    }

    return markup;
}


export const openOrder = () => {
    const instance = basicLightbox.create(`
    <div class="modal">
        <div class="cartWindow">
        <h2>Product in cart</h2>
        ${(cart.items.length === 0) ? `<p>No products in cart</p>` : ''}
        <ul class="cartList">${createMarkup()}</ul>
        <div class="cartItemsFlex">
        <span><b>All products in cart:</b> ${cart.totalQuantity}</span>
        <span class="cartItemsPrice"><b>Total price:</b> ${cart.totalPrice} UAH</span>
        </div>
        ${(cart.items.length > 0) ? `<button class="orderButton">Get order</button>` : `<button class="orderButton">Close</button>`}
        </div>
        <a>Close</a>
    </div>
`, {
        onShow: (instance) => {
            instance.element().querySelector('a').onclick = instance.close
        }
    })

    instance.show();
    const getOrder = () => {
        cart.items = [];
        cart.totalQuantity = 0;
        cart.totalPrice = 0;
        instance.close();
    }

    const orderButton = document.querySelector('.orderButton');
    orderButton.addEventListener('click', getOrder)
}