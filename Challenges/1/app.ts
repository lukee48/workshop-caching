import express, { Request, Response, NextFunction } from 'express';
import {getCommission} from "./Clients/commission-client";
import {getSharePrices} from "./Clients/shareprice-client";
import {cache} from "./Middleware/cache";

const app = express();
const port = 3000;


app.get('/', cache(30), async (req: Request, res: Response) => {

    const commission = await getCommission();
    const sharePrices = await getSharePrices();

    res.send({
        commission, sharePrices
    });

});

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
