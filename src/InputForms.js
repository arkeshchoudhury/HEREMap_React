import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const InputForms = ({pickupLocation, dropLocation, handlePickupLocationChange, handleDropLocationChange}) => {


  const inputStyle = {
    marginLeft: '10px',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const handleOnHover = (result) => {};

  const handleOnFocus = () => {};

  
  return (
    <div style={{display:"flex",alignItems:"centre", justifyContent: "center", border: '3px solid #ccc'}} >
      <div style={{alignItems:"centre", justifyContent: "center"}}>
        <label>Pickup Location:</label>
        <input id='pickuo-location' type="text" value={pickupLocation} onChange={handlePickupLocationChange} style={inputStyle}/>
        {/* <input id='pickup-location' type="text" value={pickupLocation} onChange={handlePickupLocationChange} style={inputStyle}/> */}
        <label style={{marginLeft:10}}>Drop Location:</label>
        <input id='drop-location' type="text" value={dropLocation} onChange={handleDropLocationChange} style={inputStyle}/>
      </div>
    </div>
  );
};

export default InputForms;
