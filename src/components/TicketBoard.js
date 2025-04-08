import React , {useContext} from "react";
import TicketCard from "./TicketCard";
import { TicketContext } from "../context/TicketContext.js";

const TicketBoard = () => {

  const [statusFilter, setStatusFilter] = React.useState("All");
  
  const uniqueAgents = ["Agent1", "Agent2", "Agent3"];

  const statusOptions = ["All", "Open", "In Progress", "Resolved"];
  
  //get the original data first
  const  {tickets} = useContext(TicketContext);
  // then filter it
  const filteredTickets = tickets.filter((ticket => statusFilter === "All" || ticket.status === statusFilter));
  // then sort it to get the final tickets array for rendering
  const sortedTickets = [...filteredTickets].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  const handleStatusChange = (EventTarget) => {
    setStatusFilter(EventTarget.value);
  }

  return (
    <div className="centered-container" data-testid="ticket-board">
      <h2 className="mb-10 mt-10">Ticket Board</h2>
      <div className="layout-row align-items-center">
        <label className="ml-20">Filter by Status: </label>
        <select className="ml-10" data-testId="filter-status" value={statusFilter} onChange={(e) => handleStatusChange(e.target)}>
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
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
        {sortedTickets ? sortedTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        )) : <p data-testid="no-tickets-found">No tickets found.</p>}
      </div>
    </div>
  );
};

export default TicketBoard;
