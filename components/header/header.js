import { createMarkup, createNewsMarkup } from '../pages/page.js';
import { system, nikotine, cartridge } from '../../data.js';
import { addToCart } from '../cart/cart.js';
import { openOrder } from '../modal/cartModal.js';
import { openItemModal } from '../modal/itemCart.js';

const header = () => {
    const navigationList = document.querySelector('.navigationList'); //ul
    const userProfile = document.querySelector('.userProfile');//div
    const listItems = document.querySelector('.listItems'); //ul
    const cartForModal = document.querySelector('.cartForModal');

    const userName = document.querySelector('.userName'); //span
    listItems.innerHTML = createMarkup(system);


    const setActiveLink = (event) => {
        if (event.target.nodeName === "A") {
            const currentActiveLink = navigationList.querySelector('.activeNavLink');
            currentActiveLink && currentActiveLink.classList.remove('activeNavLink');
            event.target.classList.add('activeNavLink');
            listItems.innerHTML = createMarkup(system);
        }

        switch (event.target.dataset.page) {
            case 'system':
                listItems.innerHTML = createMarkup(system);
                break;
            case 'nikotine':
                listItems.innerHTML = createMarkup(nikotine);
                break;
            case 'cartridge':
                listItems.innerHTML = createMarkup(cartridge);
                break;

            default:
                break;
        }
    }

    const setActiveUser = () => {
        userProfile.classList.toggle('activeProfile');
        (userName.textContent !== 'Andrii') ? userName.textContent = 'Andrii' : userName.textContent = 'Guest';
    }



    const addProduct = (event) => {
        const category = event.target.dataset.category;
        const id = event.target.dataset.id;
        if (category) {
            if (category === 'system') {
                for (const item of system) {
                    if (item.id === id) {
                        addToCart(item)
                    }
                }
            }
            if (category === 'nikotine') {
                for (const item of nikotine) {
                    if (item.id === id) {
                        addToCart(item)
                    }
                }
            }
        } else {
            const element = event.target.closest('[data-licategory]');
            console.log(element)
             const liCategory = element.dataset.licategory;
            const liid = element.dataset.liid;
            console.log(liCategory, liid)


            if (liCategory === 'system') {
                for (const item of system) {
                    if (item.id === liid) {
                        openItemModal(item)
                    }
                }
            }
            if (liCategory === 'nikotine') {
                for (const item of nikotine) {
                    if (item.id === liid) {
                        openItemModal(item)
                    }
                }
            }
        }




    }

    navigationList.addEventListener('click', setActiveLink); //ul
    userProfile.addEventListener('click', setActiveUser); //div
    cartForModal.addEventListener('click', openOrder);
    listItems.addEventListener('click', addProduct);
}


export default header;