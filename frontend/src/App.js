import { React} from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./component/Header";
import Homepage from "./component/Homepage";
import SeatType from "./component/SeatType";
function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/seattype/:id" element={<SeatType/>}/>
        </Routes>
    </div>
  );
}

export default App;
