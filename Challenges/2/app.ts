import express, { Request, Response, NextFunction } from 'express';
import {getProducts} from "./product-client";

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const app = express();
const port = 3000;


app.get('/', async (req: Request, res: Response) => {

    let products = myCache.get( "products" );

    if ( products == undefined ){
        products = await getProducts();

        myCache.set( "products", products, 1000 );
    }

    res.send(products);
});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
