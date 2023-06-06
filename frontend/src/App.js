import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Pengaduans from "./pages/Pengaduans";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPengaduan from "./pages/AddPengaduan";
import EditPengaduan from "./pages/EditPengaduan";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/pengaduans" element={<Pengaduans />} />
          <Route path="/pengaduans/add" element={<AddPengaduan />} />
          <Route path="/pengaduans/edit/:id" element={<EditPengaduan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
