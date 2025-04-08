import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketBoard from "./TicketBoard";
import TicketDetails from "./TicketDetails";

function Main() {
  return (
    <Router>
      <TicketBoard />
      <TicketDetails />
    </Router>
  );
}

export default Main;
