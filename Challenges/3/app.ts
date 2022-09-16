import express, { Request, Response, NextFunction } from 'express';
import {getCommission} from "./Clients/commission-client";
import {getSharePrices} from "./Clients/shareprice-client";
import {cache} from "./Middleware/cache";
import { createClient } from 'redis';

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


const app = express();
const port = 3000;


const client = createClient({
    url: ''
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

app.get('/', async (req: Request, res: Response) => {

    let commission = JSON.parse(await client.get('luke_commission'));

    if ( commission == undefined ){

        commission = await getCommission();

        await client.set('luke_commission', JSON.stringify(commission));
    }

    const sharePrices = await getSharePrices();

    res.send({
        commission, sharePrices
    });

});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
