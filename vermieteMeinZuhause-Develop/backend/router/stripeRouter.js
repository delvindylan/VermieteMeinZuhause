const express = require('express');
const stripe = require('stripe')('sk_test_51Oc7CDLnTc5mXxUW0KcnIU6ckflmJ492hH9pjqy8igmEaQWT9OwGC25VuHYhgSPLue53vqKc0r8psUMs090zi6qL00T9zsPM4U');
const Booking = require('../models/bookingModel')

const router = express.Router();

const endpointSecret = "whsec_ce5418a211df5bab436c37905f581621ba734abd660ba290608db74910acfbc8";

function splitDates(dateString) {
  // Split the string at each comma and trim whitespace
  const dateArray = dateString.split(',').map(date => date.trim());

  return dateArray;
}

router.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;

      // Access the metadata
      const bookedDatesMetadata = checkoutSession.metadata.dates;

      // Now you can use bookedDatesMetadata in your logic
      console.log('Booked Dates Metadata:', bookedDatesMetadata);
      console.log('All Metadatas: ', checkoutSession.metadata )

      const booking = new Booking({
        bookingUser: checkoutSession.metadata.bookingUser,
        dates: splitDates(bookedDatesMetadata),
        rent: checkoutSession.metadata.rent
      })

      try {
        const newBooking = await booking.save();
        console.log(newBooking);
      } catch (error) {
        console.error('Error saving booking:', error);
      }

      // Call a function to handle the event checkout.session.completed, if needed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = router;
