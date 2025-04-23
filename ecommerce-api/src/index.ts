import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {connectDB} from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { IOrderItem } from "./models/IOrderItem";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)

// Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.post('/create-checkout-session', async (req: Request, res: Response) => {
  const payload = req.body.payload;

  const session = await stripe.checkout.sessions.create({
  line_items: payload.line_items.map((lineItem) => (
      {
        price_data: {
          currency: 'SEK',
          product_data: {
            name: lineItem.product_name,
          },
          unit_amount: lineItem.unit_price * 100,
        },
        quantity: lineItem.quantity,
      }
    )),
    mode: 'payment',
    success_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5173/checkout',
    client_reference_id: payload.order_id,
  });

  res.json({checkout_url: session.url});
});

// Attempt to connect to the database
connectDB()

// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
