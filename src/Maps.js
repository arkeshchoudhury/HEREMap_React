import React, { useEffect, useRef } from "react";
import H from "@here/maps-api-for-javascript";

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null);
  const { apikey, userPosition, pickupLocation, dropLocation} = props;

  useEffect(() => {
    // Check if the map object has already been created
    if (!map.current) {
      // Create a platform object with the API key
      platform.current = new H.service.Platform({ apikey: apikey });
      // Create a new Raster Tile service instance
      const rasterTileService = platform.current.getRasterTileService({
        queryParams: {
          style: "explore.day",
          size: 512,
        },
      });
      // Creates a new instance of the H.service.rasterTile.Provider class
      // The class provides raster tiles for a given tile layer ID and pixel format
      const rasterTileProvider = new H.service.rasterTile.Provider(
        rasterTileService
      );
      // Create a new Tile layer with the Raster Tile provider
      const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
      var defaultLayers = platform.current.createDefaultLayers();  
  
      // Create a new map instance with the Tile layer, center and zoom level
      const newMap = new H.Map(mapRef.current, rasterTileLayer, {
        pixelRatio: window.devicePixelRatio,
        center: userPosition,
        zoom: 14,
      });
     
      function addMarkerToGroup(group, coordinate, html) {
        var marker = new H.map.Marker(coordinate);
        // add custom data to the marker
        marker.setData(html);
        group.addObject(marker);
      }

      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));

      var ui = H.ui.UI.createDefault(newMap, rasterTileLayer);

      var group = new H.map.Group();

      newMap.addObject(group);

      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener('tap', function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData()
        });
        // show info bubble
        ui.addBubble(bubble);
      }, false);

      addMarkerToGroup(group, {lat: 53.439, lng: -2.221},
        '<div><a href="https://www.mcfc.co.uk">Manchester City</a></div>' +
        '<div>City of Manchester Stadium<br />Capacity: 55,097</div>');

      addMarkerToGroup(group, {lat: 53.430, lng: -2.961},
        '<div><a href="https://www.liverpoolfc.tv">Liverpool</a></div>' +
        '<div>Anfield<br />Capacity: 54,074</div>');
   
      map.current = newMap;
    }

    //Changes when userPosition,  pickUpLocation, dropLocation
    if(map.current){

      //removes the old elements when the parameters are changed
      map.current.removeObjects(map.current.getObjects ())

      var routingParameters = {
        'routingMode': 'fast',
        'transportMode': 'car',
        // The start point of the route:
        'origin': `${pickupLocation}`,
        // The end point of the route:
        'destination': `${dropLocation}`,
        // Include the route shape in the response
        'return': 'polyline'
      };

       // Define a callback function to process the routing response:
       var onResult = function(result) {
        // ensure that at least one route was found
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
               // Create a linestring to use as a point source for the route line
              let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
      
              // Create a polyline to display the route:
              let routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: 'blue', lineWidth: 3 }
              });
      
              // Create a marker for the start point:
              let startMarker = new H.map.Marker(section.departure.place.location);
      
              // Create a marker for the end point:
              let endMarker = new H.map.Marker(section.arrival.place.location);
      
              // Add the route polyline and the two markers to the map:
              map.current.addObjects([routeLine, startMarker, endMarker]);
      
              // Set the map's viewport to make the whole route visible:
              map.current.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
          });
        }
      };
      
      // Get an instance of the routing service version 8:
      var router = platform.current.getRoutingService(null, 8);
      
      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult,
        function(error) {
          // alert(error.message);
          console.log(error.message);
        });

    }
  }, [apikey, userPosition, pickupLocation, dropLocation])
  
  // Return a div element to hold the map
  return <div style={{ width: "100%", height: "500px" }} ref={mapRef} />;
};

export default Map;
