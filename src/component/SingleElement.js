function SingleElement({ Task, onToggle, onDelete }) {
    return (
      <li>
        <input
          checked={Task.completed}
          name="01"
          type="checkbox"
          id={`${Task.Id}`}
          onChange={() => onToggle(Task.Id)}
        />
        <label htmlFor={`${Task.Id}`}>
          {Task.Id} - {Task.Description}
        </label>
        <button className="btn btn-danger" onClick={() => onDelete(Task.Id)}>Delete</button>
      </li>
    );
  }
  
  export default SingleElement;