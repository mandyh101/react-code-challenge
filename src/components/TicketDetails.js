import React , { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TicketContext } from "../context/TicketContext.js";
import DropdownFilter from "./UI/DropdownFilter.js";

const TicketDetails = () => {
  const  {tickets} = useContext(TicketContext);
  const navigate = useNavigate();
  // TODO I would like to look at moving this logic to get the specific ticket using a custom hook or inside the TicketContext
  const { id } = useParams();
  const ticketId = parseInt(id, 10);
  const ticket = tickets.find(t => t.id === ticketId);
  const [statusFilter, setStatusFilter] = useState(ticket.status);

  const statusOptions = ["All", "Open", "In Progress", "Resolved"];

  const handleStatusChange = (EventTarget) => {
    // TODO
  }

  const handleBackButtonClick = () => {
    navigate("/");
  }

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
          <DropdownFilter
            filterLabel={"Change status"}
            dataTestId="chnage-status"
            options={statusOptions}
            selected={statusFilter}
            onChangeFn={handleStatusChange}
          />
        </div>
        <div className="mt-5 layout-row justify-content-center">
          <button data-testid="save-changes-btn">Save Changes</button>
          <button data-testid="back-to-board-btn" onClick={handleBackButtonClick}>Back to Ticket Board</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
