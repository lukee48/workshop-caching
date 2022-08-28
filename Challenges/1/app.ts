import express, { Request, Response, NextFunction } from 'express';
import {getProducts} from "./product-client";

const app = express();
const port = 3000;


app.get('/', async (req: Request, res: Response) => {

    const products = await getProducts();

    res.send(products);

});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
