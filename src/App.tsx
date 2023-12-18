import { HashRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CarApproval from "./pages/CarApproval";
import CarList from "./pages/CarList";
import UserList from "./pages/UserList";
import SendNotification from "./pages/SendNotification";
import MoneyWithdrawal from "./pages/MoneyWithdrawal";

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
          <Route path="/user-list" element={<UserList />} />
          <Route path="/send-notification" element={<SendNotification />} />
          <Route path="/money-withdrawal" element={<MoneyWithdrawal />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
