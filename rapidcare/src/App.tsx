import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import Drowning from "./components/pages/drowning";
import Choking from "./components/pages/choking";
import Seizure from "./components/pages/seizure";
import HeartAttack from "./components/pages/heartAttack";
import Burn from "./components/pages/burn";
import SnakeBite from "./components/pages/snakeBite";
import Allergy from "./components/pages/allergy";
import Fracture from "./components/pages/fracture";
import Stroke from "./components/pages/stroke";
import Bleeding from "./components/pages/bleeding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/drowning" element={<Drowning />} />
        <Route path="/home/choking" element={<Choking />} />
        <Route path="/home/seizure" element={<Seizure />} />
        <Route path="/home/heart-attack" element={<HeartAttack />} />
        <Route path="/home/burn" element={<Burn />} />
        <Route path="/home/snake-bite" element={<SnakeBite />} />
        <Route path="/home/allergy" element={<Allergy />} />
        <Route path="/home/fracture" element={<Fracture />} />
        <Route path="/home/stroke" element={<Stroke />} />
        <Route path="/home/bleeding" element={<Bleeding />} />
      </Routes>
    </Router>
  )
}

export default App
