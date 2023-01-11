import { Route, Routes } from "react-router-dom";
import { ShowTask } from "./components/showTasks";
import { CreateTask } from "./components/createTask";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowTask />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </div>
  );
}

export default App;
