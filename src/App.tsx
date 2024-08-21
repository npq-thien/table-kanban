import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { TableData } from "./table-flowbite/components";
import KanbanBoard from "./kanban/components/KanbanBoard";

function Home() {
  return (
    <nav className="w-full bg-gray-300 p-4 flex items-center gap-4 border-b-2 border-black">
      <Link to={"/table"}>
        <p className="h3-bold hover:text-green-600 animation-scale">
          Flowbite Table
        </p>
      </Link>
      <span>|</span>
      <Link to={"/kanban"}>
        <p className="h3-bold hover:text-orange-500 animation-scale">Kanban</p>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<TableData />} />
          <Route path="/kanban" element={<KanbanBoard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
