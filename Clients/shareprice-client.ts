import {setTimeout} from "timers/promises";


export const getSharePrices = async () => {

    await setTimeout(200);

    return [ {
        company: 'Apple',
        price: Math.random() * 1000,
    }, {
        company: 'Google',
        price: Math.random() * 1000,
    }]
}
