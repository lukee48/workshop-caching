import express, { Request, Response, NextFunction } from 'express';
import {getProducts} from "./product-client";
import { createClient } from 'redis';

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const app = express();
const port = 3000;


const client = createClient({
    url: ``,
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

app.get('/', async (req: Request, res: Response) => {

    let products = JSON.parse(await client.get('luke_products'));

    if ( products == undefined ){

        products = await getProducts();

        await client.set('luke_products', JSON.stringify(products));
    }

    res.send(products);
});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
