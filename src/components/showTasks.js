import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTask } from "./updateTask";

function TodoCard({ data, handleEdit, handleDelete }) {
  // updated
  const { _id, title, description } = data;

  return (
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        <button className="button" name={_id} onClick={handleEdit}>
          edit
        </button>
        <button className="button" name={_id} onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

export function ShowTask() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(
    function () {
      async function fetchData() {
        const { data } = await axios.get("http://localhost:3000/api/tasks");
        setTodo(data);
      }
      fetchData();
    },
    [update]
  );

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    console.log("update:", update, !update);
    setUpdate(update + 1);
    // window.location.reload();
  }

  function handleDelete(e) {
    axios.delete(`http://localhost:3000/api/tasks/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

  return (
    <section className="container">
      <Link to="/create" className="button-new">
        <button className="button">New</button>
      </Link>
      <section className="contents">
        <h1>TODO</h1>
        <ul className="list-container">
          {todo.map((data) => (
            <TodoCard
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </section>

      {open ? (
        <section className="update-container">
          <div className="update-contents">
            <p onClick={handleClose} className="close">
              &times;
            </p>

            <UpdateTask
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}
