const express = require('express')
const router = express.Router()
const Booking = require('../models/bookingModel')

router.get('/bookings/:rent', async (req, res) => {
    const rent = req.params.rent;
  
    try {
      const bookings = await Booking.find({ rent: rent });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router