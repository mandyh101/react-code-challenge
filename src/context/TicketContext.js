import React, { createContext, useState, useEffect } from "react";
import ticketsData from "../tickets.json";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(ticketsData);

  const updateTicketStatus = (ticketId, newStatus) => {};

  return (
    <TicketContext.Provider value={{ tickets, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};
