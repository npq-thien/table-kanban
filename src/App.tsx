import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { TableData } from "./table-flowbite/components";
import KanbanBoard from "./kanban/components/KanbanBoard";

function App() {
  return (
    <div>
      <nav className="bg-gray-300 p-4 flex items-center gap-4 border-b-2 border-black">
        <Link to={"/table"}>
          <p className="h3-bold hover:text-white">Flowbite Table</p>
        </Link>
        <span>|</span>
        <Link to={"/kanban"}>
          <p className="h3-bold hover:text-white">Kanban</p>
        </Link>
      </nav>
      <div>
        <Routes>
          <Route path="/table" element={<TableData />} />
          <Route path="/kanban" element={<KanbanBoard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
