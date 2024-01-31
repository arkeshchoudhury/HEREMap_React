import Map from "./Maps";
import React, { useState } from "react";
import InputForms from "./InputForms";


const apikey = "API_KEY";

function App() {
  const userPosition = { lat: 64.1472, lng: -21.9398 };
  const [pickupLocation, setPickUpLocation] = useState('19,73');
  const [dropLocation, setDropLocation] = useState('13,80');

  const handlePickupLocationChange = (event) => {
    setPickUpLocation(event.target.value);
  };

  const handleDropLocationChange = (event) => {
    setDropLocation(event.target.value);
  };

  return (
    <div>
      {/* <RestaurantList list={restaurantList} onClickHandler={onClickHandler} /> */}
      {/* <div id="mapContainer"></div> */}
      <InputForms 
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
        handlePickupLocationChange={handlePickupLocationChange}
        handleDropLocationChange={handleDropLocationChange}      
      />
      {console.log(dropLocation)}
      {console.log(pickupLocation)}
      <Map
        apikey={apikey}
        userPosition={userPosition}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
      />
    </div>
  );
}

export default App;
