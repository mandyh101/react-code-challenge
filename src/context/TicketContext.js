import React, { createContext, useState, useEffect } from "react";
import ticketsData from "../tickets.json";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(ticketsData);

  // Function to update ticket status and refresh the ticket list to display the up to date data
  const updateTicketStatus = (ticketId, newStatus) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  return (
    <TicketContext.Provider value={{ tickets, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};
