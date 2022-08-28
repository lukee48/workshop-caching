import {setTimeout} from "timers/promises";


export const getProducts = async () => {

    const randomTimeout = Math.floor(Math.random() * 3000);

    await setTimeout(500 + randomTimeout);

    return [ {
        sku: 'Product-A',
        price: 700,
        description: 'TV'
    }, {
        sku: 'Product-B',
        price: 150,
        description: 'Fridge'
    }]
}
