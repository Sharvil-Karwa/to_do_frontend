import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTask({ _id, handleClose, handleUpdate }) {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  useEffect(function () {
    async function getData() {
      await axios.get(`http://localhost:3000/api/tasks/${_id}`).then((res) => {
        document.getElementById("title").value = res.data.title;
        document.getElementById("description").value = res.data.description;
        setData((data) => ({
          ...data,
          title: res.data.title,
          description: res.data.description,
        }));
      });
    }
    getData();
  }, []);

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/tasks/${_id}`,
        data
      );
      setData({ title: "", description: "" });
      console.log(res.data.message);
    } catch (err) {
      console.log("Failed to update todo");
      console.log(err.message);
    }
  }

  return (
    <form
      className="form-container"
      onSubmit={async (e) => {
        await handleSubmit(e);
        handleUpdate();
        handleClose();
      }}
    >
      <label htmlFor="title" className="label">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="input"
        onChange={(e) => handleChange(e)}
        id="title"
      />
      <label htmlFor="description" className="label">
        Description
      </label>
      <input
        type="text"
        name="description"
        className="input"
        onChange={(e) => handleChange(e)}
        id="description"
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
