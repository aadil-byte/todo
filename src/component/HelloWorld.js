import React, { useEffect, useState } from 'react';
import SingleElement from './SingleElement';

function AllList() {
  const [Tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState({ Id: '', Description: '', completed: false });

  let seed = () => {
    setTask(prevTasks => [
      ...prevTasks,
      { Id: 1, Description: "Task 1", completed: true },
      { Id: 2, Description: "Task 2", completed: false },
      { Id: 3, Description: "Task 3", completed: true },
      { Id: 4, Description: "Task 4", completed: false },
      { Id: 5, Description: "Task 5", completed: true },
    ]);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('Tasks');
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    } else {
      seed();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
  }, [Tasks]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  let renderAllElements = () => {
    if (Tasks.length > 0) {
      return Tasks.map(p => (
        <SingleElement key={p.Id} Task={p} onToggle={toggleElement} onDelete={deleteElement} />
      ));
    } else {
      return <h1>No Data</h1>;
    }
  };

  let addElement = (e) => {
    e.preventDefault();
    setTask(prevTasks => [...prevTasks, { ...newTask, Id: Number(newTask.Id) }]);
    setNewTask({ Id: '', Description: '', completed: false });
  };

  let toggleElement = (id) => {
    setTask(prevTasks =>
      prevTasks.map(prevTask => {
        if (prevTask.Id === id) {
          return { ...prevTask, completed: !prevTask.completed };
        }
        return prevTask;
      })
    );
  };
  let deleteElement = (id) => {
    setTask(prevTasks => prevTasks.filter(prevTask => prevTask.Id !== id));
  };

  return (
    <div className='text-center'>
      <h2 className='mt-4'>Task Manager</h2>
      <p>List of All Tasks</p>
      <div id="checklist">
        <ul>
          {renderAllElements()}
        </ul>

        <form>
          <div>
            <label>Id: </label>
            <input
              name='Id'
              type='number'
              value={newTask.Id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              name='Description'
              type='text'
              value={newTask.Description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Completed: </label>
            <input
              name='completed'
              type='checkbox'
              checked={newTask.completed}
              onChange={handleInputChange}
            />
          </div>
          <button className='btn btn-primary' onClick={addElement}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default AllList;
