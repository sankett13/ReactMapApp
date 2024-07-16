import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const MapPage = () => {
  const location = useLocation();
  const { LoggedIn, UserName } = location.state;
  // console.log(LoggedIn);
  // console.log(UserName);
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [geolocationError, setGeolocationError] = useState(null);

  const openCageApiKey = "b0f49fd8d32b4427826a22c57d8f8395"; // Replace with your OpenCage API key

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition([latitude, longitude]);
          },
          (error) => {
            setGeolocationError(error.message);
            console.error("Error getting user location:", error);
          }
        );
      } else {
        setGeolocationError("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchLocationName = async () => {
      if (clickedLocation) {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${clickedLocation.lat}+${clickedLocation.lng}&key=${openCageApiKey}`
          );
          const data = await response.json();
          const results = data.results;
          if (results.length > 0) {
            setLocationName(results[0].formatted);
          } else {
            setLocationName("Location not found");
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
          setLocationName("Error fetching location name");
        }
      }
    };

    fetchLocationName();
  }, [clickedLocation, openCageApiKey]);

  const MapEvents = () => {
    useMapEvents({
      click: (event) => {
        const newLocation = event.latlng;
        setClickedLocation(newLocation);
        setLocationName("Loading...");
      },
    });
    return null;
  };

  if (geolocationError) {
    return (
      <div>
        <Navbar />
        <p>Error getting your location: {geolocationError}</p>
      </div>
    );
  }

  if (!currentPosition) {
    return <p>Loading map...</p>;
  }

  if (LoggedIn === "true") {
    return (
      <div>
        <Navbar fullName={UserName} />
        <MapContainer
          center={currentPosition}
          zoom={13}
          style={{ height: "calc(100vh - 60px)", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={currentPosition}>
            <Popup>Your Location</Popup>
          </Marker>

          {clickedLocation && (
            <Marker position={clickedLocation}>
              <Popup>
                {locationName}
                <br />
                Latitude: {clickedLocation.lat.toFixed(5)}, Longitude:{" "}
                {clickedLocation.lng.toFixed(5)}
              </Popup>
            </Marker>
          )}

          <MapEvents />
        </MapContainer>
      </div>
    );
  } else {
    alert("Plese Login");
    navigate("/login");
  }
};

export default MapPage;
