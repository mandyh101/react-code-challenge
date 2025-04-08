import React from "react";
import TicketCard from "./TicketCard";

const TicketBoard = ({tickets}) => {
  const uniqueAgents = ["Agent1", "Agent2", "Agent3"];
  const ticket = {
    id: 2,
    title: "Payment Failure",
    description: "Payment is not going through for a specific order.",
    assignedAgent: "Bob",
    dueDate: "2024-12-12",
    status: "In Progress",
  };

  return (
    <div className="centered-container" data-testid="ticket-board">
      <h2 className="mb-10 mt-10">Ticket Board</h2>
      <div className="layout-row align-items-center">
        <label className="ml-20">Filter by Status: </label>
        <select className="ml-10" data-testId="filter-status" value={"Open"}>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <label className="ml-20">Filter by Agent: </label>
        <select className="ml-10" data-testid="filter-agent" value={"Agent1"}>
          <option value="All">All</option>
          {uniqueAgents.map((agent, index) => (
            <option key={index} value={agent}>
              {agent}
            </option>
          ))}
        </select>
      </div>
{/* //TODO check ascending order of tickets */}
      <div className="ticket-board mt-20" data-testid="tickets">
        {/* <p data-testid="no-tickets-found">No tickets found.</p> */}
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketBoard;
