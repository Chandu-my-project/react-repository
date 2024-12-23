export default function ticketReducers(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return { ...state, tickets: [...state.tickets, action.payload] };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };

    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
      };

    case "SET_EDITING_TICKET":
      return {
        ...state,
        editingTicket: action.payload,
      };
    case "CLEAR_EDITING_TICKET":
      return {
        ...state,
        editingTicket: null,
      };
    case "SET_SORTING":
      return {
        ...state,
        sortPreference: action.payload,
      };
    default:
      return state;
  }
}
