import React, { useEffect, useState } from 'react';
import '../css/ObjectCard.css';
import { Datepicker, getJson, localeDe, setOptions } from '@mobiscroll/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ObjectCard = (props) => {

  const [booking, setBooking] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/booking/bookings/${props.shortname}`, {
     method: "GET",
      headers: {
    'Content-Type': 'application/json'
  }
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    if (response) {
      console.log(bookingToInvalid(response))

      setBooking(response)
    }
  })
  .catch((error) => {
    console.error('Error fetching bookings:', error);
  });
  }, [])

  const addressLines = props.adress ? props.adress.split(',') : [];

  function bookingToInvalid(dataArray) {
    const invalidDates = [];

    dataArray.forEach((booking) => {
        const dates = booking.dates;

        invalidDates.push(...dates);
    });

    return invalidDates;
}

const checkout = async () => {
  if(sessionStorage.getItem('token')){
    await fetch('http://localhost:3000/jsonstripe/checkout', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: stripeObject,
        bookingUser: sessionStorage.getItem('token'),
        bookedDates: multiple,
        rent: props.shortname
      })
  }).then((response) => {
      return response.json();
  }).then((response) => {
      if(response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
      }
  });
  }else{
    toast.error('Sie müssen angemeldet sein!', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
    
}

  const currentDate = new Date(); // Get the current date
  const min = currentDate.toISOString().split('T')[0] + 'T00:00';
  const max = '2024-07-10T00:00';
  const [multiple, setMultiple] = useState([
    '2024-01-11T00:00',
    '2024-01-16T00:00',
    '2024-01-20T00:00',
    '2024-01-17T00:00'
  ]);
  const [multipleLabels, setMultipleLabels] = useState([]);
  const [multipleInvalid, setMultipleInvalid] = useState([]);

  const price = props.stripeID
  const quantity = multiple.length

  const stripeObject = [
    {
      price: price,
      quantity: quantity
    }
  ]

  const onPageLoadingMultiple = (event, inst) => {
    getBookings(event.firstDay, (bookings) => {
      setMultipleLabels(bookings.labels);
      setMultipleInvalid(bookingToInvalid(booking));
    });
  };

  const getBookings = (date, callback) => {
    const invalid = [];
    const labels = [];

    getJson('//trial.mobiscroll.com/getbookings/?year=' + date.getFullYear() + '&month=' + date.getMonth(), (bookings) => {
      for (const booking of bookings) {
        const d = new Date(booking.d);
        if (booking.nr > 0) {
          labels.push({
            start: d,
            title: booking.nr + 'SPOTS',
            textColor: '#e1528f'
          });
        } else {
          invalid.push(d);
        }
      }
      callback({ labels, invalid });
    }, 'jsonp');
  };


  return (
    <div className='ObjectCard-Container'>
      <img className='CardImage' src={props.img} alt={props.img} />
      <div className='CardContext'>
        <h1 className='CardTitle'>{props.title}</h1>
        {addressLines.map((line, index) => (
          <p key={index} className='CardAdress'>
            {line.trim()}
          </p>
        ))}
        <p>{props.price} CHF pro Nacht</p>
        <div className='Rent-Container'>
          <div className='RentButton-Container'>
            <button className='RentButton' onClick={checkout} >Mieten</button>
          </div>
          <div className='Datepicker-Container'>
          <Datepicker 
              controls={['calendar']}
              value={multiple}
              min={min}
              max={max}
              invalid={multipleInvalid}
              selectMultiple={true}
              onPageLoading={onPageLoadingMultiple}
              onChange={(event, inst) => {
                const selectedDates = event.value;
                setMultiple(selectedDates);
              }}
              themeVariant='light'
              theme='windows'
              locale={localeDe}
            />
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default ObjectCard;
