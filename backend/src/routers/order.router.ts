import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constant/http_status';
import { OrderModel } from '../configs/models/order.model';
import { OrderStatus } from '../constant/order_status';
import auth from '../middleware/auth.mid';

const router = Router();
router.use(auth);

router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
})
)

router.get('/track/:id', asyncHandler( async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))



router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res ) => {
    const order= await OrderModel.findOne({user: req.user.id, status: OrderStatus.NEW});
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}))

export default router;