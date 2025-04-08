/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import ticketsData from "./tickets.json";

describe("Customer Support Ticketing System", () => {
  beforeEach(() => {
    render(<App />);
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    cleanup();
  });

  it("displays Ticket Board on the home path", () => {
    expect(screen.getByTestId("ticket-board")).toBeInTheDocument();

    const tickets = screen.getAllByTestId("ticket-card");
    expect(tickets.length).toBe(ticketsData.length); // Matches number of tickets in JSON
    expect(window.location.pathname).toBe("/");
    const sortedTickets = [...ticketsData].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    for (let i = 0; i < ticketsData.length; i++) {
      expect(screen.getAllByTestId("ticket-card")[i].children[0]).toHaveTextContent(
        sortedTickets[i].title
      );
      expect(screen.getAllByTestId("ticket-card")[i].children[1]).toHaveTextContent(
        "Assigned Agent: " + sortedTickets[i].assignedAgent
      );
      expect(screen.getAllByTestId("ticket-card")[i].children[2]).toHaveTextContent(
        "Due Date: " + sortedTickets[i].dueDate
      );
      expect(screen.getAllByTestId("ticket-card")[i].children[3]).toHaveTextContent(
        sortedTickets[i].status
      );
    }
  });

  it("navigates to Ticket Details when a ticket is clicked", async () => {
    const ticketCard = screen.getAllByTestId("ticket-card")[0];
    fireEvent.click(ticketCard.children[4]);

    const sortedTickets = [...ticketsData].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    await screen.findByText(sortedTickets[0].description);
    expect(window.location.pathname).toBe(`/ticket/${sortedTickets[0].id}`);

    const details = screen.getByTestId("ticket-details");
    expect(details).toBeInTheDocument();
    expect(screen.getByText(sortedTickets[0].description)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("back-to-board-btn"));
    await screen.findByTestId("ticket-board");
    expect(window.location.pathname).toBe("/");
  });

  it("filters tickets by status", async () => {
    const statusFilter = screen.getByTestId("filter-status");
    fireEvent.change(statusFilter, { target: { value: "Open" } });

    await waitFor(() => {
      const tickets = screen.getByTestId("tickets");
      const filteredTickets = ticketsData.filter((ticket) => ticket.status === "Open");
      expect(tickets.children.length).toBe(filteredTickets.length);

      filteredTickets.forEach((ticket) => {
        expect(screen.getByText(ticket.title)).toBeInTheDocument();
      });
    });
  });

  it("filters tickets by agent", async () => {
    const agentFilter = screen.getByTestId("filter-agent");

    fireEvent.change(agentFilter, { target: { value: "Alice" } });
    expect(screen.queryByTestId("no-tickets-found")).not.toBeInTheDocument();

    await waitFor(() => {
      const tickets = screen.getByTestId("tickets");

      const filteredTickets = ticketsData.filter((ticket) => ticket.assignedAgent === "Alice");

      expect(tickets.children.length).toBe(filteredTickets.length);

      filteredTickets.forEach((ticket) => {
        expect(screen.getByText(ticket.title)).toBeInTheDocument();
      });
    });
  });

  it("checks all statuses and unique agent names are present in the dropdowns", () => {
    const statusDropdown = screen.getByTestId("filter-status");

    expect(statusDropdown.children[0]).toHaveTextContent("All");
    expect(statusDropdown.children[1]).toHaveTextContent("Open");
    expect(statusDropdown.children[2]).toHaveTextContent("In Progress");
    expect(statusDropdown.children[3]).toHaveTextContent("Resolved");

    const agentDropdown = screen.getByTestId("filter-agent");

    const uniqueAgents = [...new Set(ticketsData.map((ticket) => ticket.assignedAgent))];
    const agentDropdownTexts = Array.from(agentDropdown.children).map((child) => child.textContent);

    expect(agentDropdownTexts[0]).toBe("All");

    uniqueAgents.forEach((agent) => {
      expect(agentDropdownTexts).toContain(agent);
    });
  });

  it("navigates to Ticket Details and updates the ticket status and reflect it on main page", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const ticketCard = screen.getAllByTestId("ticket-card")[0];
    fireEvent.click(ticketCard.children[4]);

    const sortedTickets = [...ticketsData].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    const ticketDetails = await screen.findByTestId("ticket-details");
    expect(ticketDetails).toBeInTheDocument();
    expect(screen.getByText(sortedTickets[0].description)).toBeInTheDocument();

    expect(screen.getByTestId("ticket-details").children[4]).toHaveTextContent(
      sortedTickets[0].status
    );

    const statusDropdown = screen.getByTestId("change-status");
    fireEvent.change(statusDropdown, { target: { value: "In Progress" } });

    const saveButton = screen.getByTestId("save-changes-btn");
    fireEvent.click(saveButton);

    expect(alertMock).toHaveBeenCalledWith("Ticket status has been updated successfully!");
    expect(screen.getByTestId("ticket-details").children[4]).toHaveTextContent("In Progress");

    const backButton = screen.getByTestId("back-to-board-btn");
    fireEvent.click(backButton);

    await screen.findByTestId("ticket-board");
    expect(window.location.pathname).toBe("/");

    expect(screen.getAllByTestId("ticket-card")[0].children[3]).toHaveTextContent("In Progress");
  });

  it("changes the ticket status in details but does not save, so no changes are reflected on the board", async () => {
    const ticketCard = screen.getAllByTestId("ticket-card")[0];
    fireEvent.click(ticketCard.children[4]);

    const statusDropdown = screen.getByTestId("change-status");
    fireEvent.change(statusDropdown, { target: { value: "In Progress" } });
    expect(screen.getByTestId("ticket-details").children[4]).toHaveTextContent("Status: Resolved");

    const backButton = screen.getByTestId("back-to-board-btn");
    fireEvent.click(backButton);

    await screen.findByTestId("ticket-board");
    expect(window.location.pathname).toBe("/");

    expect(screen.getAllByTestId("ticket-card")[0].children[3]).toHaveTextContent("Resolved");
  });

  it("shows 'No tickets found' message when there are no tickets", () => {
    const agentFilter = screen.getByTestId("filter-agent");
    fireEvent.change(agentFilter, { target: { value: "Alice" } });
    const statusFilter = screen.getByTestId("filter-status");
    fireEvent.change(statusFilter, { target: { value: "Resolved" } });
    const noTicketsMessage = screen.getByTestId("no-tickets-found");
    expect(noTicketsMessage).toBeInTheDocument();
    expect(noTicketsMessage).toHaveTextContent("No tickets found.");
  });
});
