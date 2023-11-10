import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CarApproval from "./pages/CarApproval";
import CarList from "./pages/CarList";

const MainLayout = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-grow">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/car-approval" element={<CarApproval />} />
          <Route path="/car-list" element={<CarList />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
