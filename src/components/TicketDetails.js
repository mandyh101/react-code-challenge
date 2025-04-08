import React , { useContext } from "react";
import { useParams } from "react-router-dom";
import { TicketContext } from "../context/TicketContext.js";

const TicketDetails = () => {
  // TODO I would like to look at moving this logic to get the specific ticket using a custom hook or inside the TicketContext
  const { id } = useParams();
  const  {tickets} = useContext(TicketContext);
  const ticketId = parseInt(id, 10);
  const ticket = tickets.find(t => t.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="layout-column align-items-center">
      <h3 className="mb-0">Ticket Details</h3>
      <div data-testid="ticket-details">
        <h4 className="mb-5">Login Issue</h4>
        <p>
          <strong>Description:</strong> {ticket.description}
        </p>
        <p>
          <strong>Assigned Agent:</strong> {ticket.assignedAgent}
        </p>
        <p>
          <strong>Due Date:</strong> {ticket.dueDate}
        </p>
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>

        <div>
          <label htmlFor="status">Change Status: </label>
          <select data-testid="change-status" id="status" value={"Open"}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="mt-5 layout-row justify-content-center">
          <button data-testid="save-changes-btn">Save Changes</button>
          <button data-testid="back-to-board-btn">Back to Ticket Board</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
