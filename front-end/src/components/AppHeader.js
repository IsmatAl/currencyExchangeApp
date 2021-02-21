import React from 'react';
import { Link } from 'react-router-dom';


const AppHeader = ({ onRateListing }) => {
  return (
    <div className='container'>
      <ul>
        <li><Link to='/add'>Add an exchange rate</Link></li>
        <li><Link to='/exchange-rates' onClick={() => onRateListing()}>View currency exchange rates</Link></li>
        <li><Link to='/flowChart'>Make FlowChart</Link></li>
      </ul>
    </div>
  );
}

export default AppHeader;
