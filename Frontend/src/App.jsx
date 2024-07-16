import "./App.css";
import Footer from "./components/Footer";
import GooglAuth from "./components/GoogleAuth";
// import Home from "./components/Home";
import Login from "./components/Login";
import SimpleMap from "./components/MapPage";
import MapComponent from "./components/MapPage";
import MapPage from "./components/MapPage";
import ProtectedLogin from "./components/ProtectedLogin";
import Signup from "./components/SignUp";
import { Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/map"
          element={
            <MapElement>
              <MapPage />
            </MapElement>
          }
        />
      </Routes>
    </>
  );
}

function MapElement({ children }) {
  return <>{children}</>;
}

export default App;
