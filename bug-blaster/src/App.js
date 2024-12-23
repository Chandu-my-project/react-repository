import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { useReducer } from "react";
import TicketForm from "./components/TicketForm";
import ticketReducers from "./reducers/ticketReducers";
import TicketList from "./components/TicketList";
import { sortTickets } from "./utilities/sortingUtilities";

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: "High to Low",
  };

  //dispatch --> to make changes to the state, calls actions inside the reducer
  //state --> access the current state
  const [state, dispatch] = useReducer(ticketReducers, initialState);

  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>
        {/* && then not AND operator */}
        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>
            <select
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({
                  type: "SET_SORTING",
                  payload: e.target.value,
                })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
