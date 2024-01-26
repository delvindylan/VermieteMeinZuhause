const express = require('express');
const stripe = require('stripe')('sk_test_51Oc7CDLnTc5mXxUW0KcnIU6ckflmJ492hH9pjqy8igmEaQWT9OwGC25VuHYhgSPLue53vqKc0r8psUMs090zi6qL00T9zsPM4U');

const router = express.Router();

router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
      lineItems.push({
        price: item.price,
        quantity: item.quantity,
      });
    });
  
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/thankyou',
      cancel_url: 'http://localhost:5173/sorry',
      metadata: {
        bookingUser: req.body.bookingUser,
        dates: req.body.bookedDates.join(', '),
        rent: req.body.rent
      },
    });
  
    res.send(JSON.stringify({
      url: session.url,
    }));
  });

module.exports = router;