import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTask() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      title: data.title,
      description: data.description,
    };
    console.log(todo);
    axios
      .post("http://localhost:3000/api/tasks", data)
      .then((res) => {
        setData({
          title: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="container">
      <Link to="/" className="button-back">
        <button className="button">Back</button>
      </Link>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit} className="contents">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <button className="button">Create</button>
      </form>
    </section>
  );
}
