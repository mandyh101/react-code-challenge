import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card" data-testid="ticket-card">
      <h3>Login Issue</h3>
      <p>
        <strong>Assigned Agent:</strong> Alice
      </p>
      <p>
        <strong>Due Date:</strong> 2024-12-10
      </p>
      <p>{ticket.status}</p>
      <Link to="/">View Details</Link>
    </div>
  );
};

export default TicketCard;
