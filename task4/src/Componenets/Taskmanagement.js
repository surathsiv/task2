import React, {useState} from 'react';
import '../App.css';

const Taskmanagement = () => {
    const [task, setTask] = useState([]);
    const [newtask, setNewtask] = useState({title: "", description:""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewtask((prev) => ({ ...prev, [name]: value }));
      };

      const handleAddTask = () => {
        if (newtask.title !== "") {
          if (newtask.description !== "") {
            setTask((prevTasks) => [
              ...prevTasks,
              { ...newtask, id: Date.now(), status: "To Do" },
            ]);
            setNewtask({ title: "", description: "" });
          } else {
            alert("Description cannot be empty");
          }
        } else {
          alert("Title cannot be empty");
        }
      };

      const handleDeleteTask = (id) => {
        setTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
      };
    
      const handleUpdateTask = (id, status) => {
        setTask((prevTasks) =>
          prevTasks.map((tasks) =>
            tasks.id === id ? { ...tasks, status: status } : tasks
          )
        );
      };
    
      const handleMoveTask = (id, newStatus) => {
        setTask((prevTasks) =>
          prevTasks.map((tasks) =>
            tasks.id === id ? { ...tasks, status: newStatus } : tasks
          )
        );
      };
  return (
    <>
    <div className='Task-container'>
        <h1>Task Management</h1>
        <input type='text' 
        name='title' 
        placeholder='Title'
        value={newtask.title}
        onChange={handleChange} />
        <input type='text' 
        name='description' 
        placeholder='Description'
        value={newtask.description}
        onChange={handleChange} />
        <button onClick={handleAddTask}>Add Task</button>

    </div>
    <div>
        <h1>To Do</h1>
        {task.map(
            (item) =>
              item.status === "To Do" && (
                <div key={task.id} >
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <button onClick={() => handleUpdateTask(item.id, "In Progress")} >Start</button>
                    <button onClick={() => handleDeleteTask(task.id)} > Delete</button>
                </div>
              )
            )}

    </div>
    <div>
        <h1>In Progress</h1>
        {task.map(
            (item) =>
              item.status === "In Progress" && (
                <div key={task.id} >
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <button onClick={() => handleUpdateTask(item.id, "Completed")} >Complete</button>
                    <button onClick={() => handleMoveTask(item.id, "To Do")} >Move Back</button>
                    <button onClick={() => handleDeleteTask(item.id)} > Delete</button>
                </div>
              )
            )}

    </div>
    <div>
        <h1>Completed</h1>
        {task.map(
            (item) =>
              item.status === "Completed" && (
                <div key={task.id} >
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <button onClick={() => handleMoveTask(item.id, "In Progress")} >Move Back</button>
                    <button onClick={() => handleMoveTask(item.id, "To Do")} >Move First</button>
                    <button onClick={() => handleDeleteTask(item.id)} > Delete</button>
                </div>
              )
            )}

    </div>
    </>
  )
}

export default Taskmanagement ;
