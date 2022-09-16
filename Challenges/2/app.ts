import express, { Request, Response, NextFunction } from 'express';
import {getCommission} from "./Clients/commission-client";
import {getSharePrices} from "./Clients/shareprice-client";
import {cache} from "./Middleware/cache";

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


const app = express();
const port = 3000;


app.get('/', async (req: Request, res: Response) => {

    let commission = myCache.get( "commission" );

    if ( commission == undefined ){
        commission = await getCommission();

        myCache.set( "commission", commission, 30 );
    }

    const sharePrices = await getSharePrices();

    res.send({
        commission, sharePrices
    });

});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
