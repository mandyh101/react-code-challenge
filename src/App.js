import React from "react";
import { TicketProvider } from "./context/TicketContext";
import "./App.css";
import "h8k-components";
import Main from "./components/Main";

const title = "Customer Support Ticketing system";

const App = () => {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <TicketProvider>
        <Main />
      </TicketProvider>
    </div>
  );
};

export default App;
