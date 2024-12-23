import React, { useState, useEffect } from "react";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("1");
  //load initial value when edit the ticket
  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDesc(editingTicket.desc);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDesc("");
    setPriority("1");
  };

  const handleCancelEdit = () => {
    dispatch({
      type: "CLEAR_EDITING_TICKET",
    });
    clearForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the page from loading when clicked submit button

    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(), //easy to read string current date, time
      title,
      desc,
      priority,
    };

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="text"
          value={desc}
          className="form-input"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(
          ([value, label]) => (
            <label key={value} className="priority-label">
              {label}

              <input
                type="radio"
                value={value}
                checked={priority === value}
                className="priority-input"
                onChange={(e) => setPriority(e.target.value)}
              ></input>
            </label>
          ) //using () for html
        )}
      </fieldset>

      <button type="sumbit" className="button">
        Submit
      </button>

      {editingTicket && (
        <button className="button" onClick={handleCancelEdit}>
          Cancel edit
        </button>
      )}
    </form>
  );
}
