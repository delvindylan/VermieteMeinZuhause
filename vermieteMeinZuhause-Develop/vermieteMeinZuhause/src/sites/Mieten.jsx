import React, { useState } from 'react';
import ObjectCard from '../components/ObjectCard';
import '../css/Mieten.css';
import Junior from '../assets/junior_suite.jpg';
import President from '../assets/President.jpg';
import Suite2 from '../assets/Suite 2.jpg';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';


const Mieten = () => {
  return (
    <div className='Mieten-Container'>
      <h1>Mieten</h1>
      <div className='Object-Board'>
        <ObjectCard img={Junior} shortname="Junior Suite" adress="Junior Suite" price="500" stripeID="price_1Ocn0WLnTc5mXxUWdresnzks" />
        <ObjectCard img={President} shortname="President Suite" adress="President Suite" price="800" stripeID="price_1Ocn32LnTc5mXxUWKWJhgzew" />
        <ObjectCard img={Suite2} shortname="President Suite + View" adress="President Suite + View" price="1000" stripeID="price_1Ocn3FLnTc5mXxUWNrgfLB2Y" />
      </div>
    </div>
  );
};

export default Mieten;
