import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketBoard from "./TicketBoard";
import ticketsData from "../tickets.json";
// import TicketDetails from "./TicketDetails";



function Main() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<TicketBoard tickets={ticketsData} />} />
            {/* <TicketBoard /> */}
            {/* <TicketDetails /> */}
          </Routes>
      </Router>
    </>
  );
}

export default Main;
