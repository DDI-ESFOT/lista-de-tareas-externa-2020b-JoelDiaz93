import React, { useState, useEffect } from "react";
import "../styles/User.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(1);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const responseUser = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + count
      );
      const dataUser = await responseUser.json();
      console.log("data", dataUser);
      setUsers(dataUser);

      const responseTask = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + count + "/todos"
      );
      const dataTask = await responseTask.json();
      console.log("task", dataTask);
      setTask(dataTask);
    };

    getData();
  }, [count]);

  const handleSum = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };
  const handleRest = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddTask = () => {
    const newTask ={
        userId: count,
        id: task.length+1,
        title: document.querySelector("#task").value,
        completed: false
    };
    if (showError) {
      document.title = `ERROR`;
    } else if (task !== "") {
      setTask((prevState) => [...prevState, newTask]);
      document.querySelector("#task").value = "";
    } else {
      setShowError(true);
    }
  };

  const handleChangeInput = (event) => {
    //console.log("e", event.target.value);
    if (event.target.value !== "") {
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleDeleteTask = (index) => {
    setTask((prevState) => {
      return prevState.filter((task, i) => i !== index);
    });
  };

  const handleCompleteTask = (index) => {
    const newValue = {
      userId: count,
      id: index,
      title: task[index].title,
      completed: !task[index].completed,
    };
    console.log("newComplete", newValue);
    const update = task.map((value, indexValue) => {
      if (indexValue === index) {
        return newValue;
      }
      return value;
    });
    setTask(update);
    console.log("newTotal", update);
  };

  return (
    <div>
      <button onClick={handleRest}>Anterior Usuario</button>
      <button onClick={handleSum}>Siguiente Usuario</button>
      {/* //<h1>{count}</h1> */}
      <h1>Informacion del usuarios</h1>
      <ul>
        <li>Nombre: {users.name}</li>
        <li>Usuario: {users.username}</li>
        <li>Email: {users.email}</li>
        <li>Web: {users.website}</li>
        <li>Telefono: {users.phone}</li>
      </ul>

      <label htmlFor="task">Tarea</label>
      <input type="text" id="task" onChange={handleChangeInput} />
      {showError && <div className="error">Ingrese el nombre de la tarea</div>}
      <button onClick={handleAddTask}>Agregar tarea</button>
      <h1>Lista tareas ({task.length} en total)</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Eliminar</th>
            <th>Completar</th>
          </tr>
        </thead>
        <tbody>
          {task.map((taskList, index) => (
            <tr key={index}>
              <td>{taskList.title}</td>
              <td
                onClick={() => handleCompleteTask(index)}
                className={taskList.completed ? "task-true" : "task-false"}
              >
                {taskList.completed ? "Completada" : "Marcar como completada"}
              </td>
              <td>
                <button onClick={() => handleDeleteTask(index)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
