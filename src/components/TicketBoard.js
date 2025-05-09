import React , {useContext, useEffect} from "react";
import TicketCard from "./TicketCard";
import { TicketContext } from "../context/TicketContext.js";
import DropdownFilter from "./UI/DropdownFilter.js";

const TicketBoard = () => {

  const  {tickets} = useContext(TicketContext);
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [agentFilter, setAgentFilter] = React.useState("All");
  
  const statusOptions = ["All", "Open", "In Progress", "Resolved"];
  //getUniqueAgentOptions is a function that updtes the list of agent options in the filter agent depending on the agents related to the filtered tickets.
  const getUniqueAgentOptions = (tickets) => {
    const uniqueAgentSet = new Set(tickets.map(ticket =>ticket.assignedAgent));
    return ["All", ...uniqueAgentSet]; //spreads the set into an array and adds "All" as the first element
  }

  const matchesAgentFilter = (ticket) => 
    agentFilter === "All" || ticket.assignedAgent === agentFilter;
  const matchesStatusFilter = (ticket) =>
    statusFilter === "All" || ticket.status === statusFilter;
  //get the original data first
  // then filter it
  const filteredTickets = tickets.filter((ticket => matchesStatusFilter(ticket) && matchesAgentFilter(ticket)));
  // then sort it to get the final tickets array for rendering
  const sortedTickets = [...filteredTickets].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
  

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  }

  const handleAgentChange = (event) => {
    setAgentFilter(event.target.value);
  }
// TODO extract filter logic to a custom hook and filter UI into a separate component
  return (
    <div className="centered-container" data-testid="ticket-board">
      <h2 className="mb-10 mt-10">Ticket Board</h2>
      {/* TODO add a gap of 20px in the css */}
      <div className="board-filters layout-row align-items-center">
        <div>
          <DropdownFilter
            filterLabel={"Filter by status:"}
            dataTestId="filter-status"
            options={statusOptions}
            selected={statusFilter}
            onChangeFn={handleStatusChange}
          />
        </div>
        <div>
          <DropdownFilter
            filterLabel={"Filter by status:"}
            dataTestId="filter-agent"
            options={getUniqueAgentOptions(tickets)}
            selected={agentFilter}
            onChangeFn={handleAgentChange}
          />
        </div>
      </div>
{/* //TODO check ascending order of tickets */}
      <div className="ticket-board mt-20" data-testid="tickets">
        {sortedTickets.length > 0 ? sortedTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        )) : <p data-testid="no-tickets-found">No tickets found.</p>}
      </div>
    </div>
  );
};

export default TicketBoard;
