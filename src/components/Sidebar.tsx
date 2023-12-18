import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface User {
  address: string;
  avatar: string;
  createdAt: string;
  dob: string;
  email: string;
  firstName: string;
  gender: boolean;
  id: number;
  isActive: boolean;
  isLogin: boolean;
  isVerifiedDriverLicense: boolean;
  isVerifiedEmail: boolean;
  isVerifiedPhone: boolean;
  lastName: string;
  latitude: number;
  longitude: number;
  name: string;
  password: string;
  phone: string;
  point: number;
  rating: number;
  role: number;
  status: string;
  surplus: number;
  totalRide: number;
  updatedAt: string;
  verificationCode: number | null;
  verificationCodeMail: number;
}

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const userItem = localStorage.getItem("user");

    if (!userItem) {
      navigate("/login");
    } else {
      let userData = JSON.parse(userItem);
      setUser(userData);
      console.log(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed overflow-auto h-screen  bg-gray-800 text-white w-64 space-y-6 px-4 py-7">
      <h1 className="text-2xl font-extrabold text-center">GoTraffic</h1>
      <Link
        to="/"
        className={`block py-2.5 px-4 rounded transition duration-200 ${
          location.pathname === "/" ? "bg-blue-500" : "hover:bg-blue-500"
        }`}
      >
        Home
      </Link>
      <Link
        to="/car-approval"
        className={`block py-2.5 px-4 rounded transition duration-200 ${
          location.pathname === "/car-approval"
            ? "bg-blue-500"
            : "hover:bg-blue-500"
        }`}
      >
        Duyệt xe
      </Link>
      <Link
        to="/car-list"
        className={`block py-2.5 px-4 rounded transition duration-200 ${
          location.pathname === "/car-list"
            ? "bg-blue-500"
            : "hover:bg-blue-500"
        }`}
      >
        Danh sách xe
      </Link>
      <Link
        to="/user-list"
        className={`block py-2.5 px-4 rounded transition duration-200 ${
          location.pathname === "/user-list"
            ? "bg-blue-500"
            : "hover:bg-blue-500"
        }`}
      >
        Danh sách người dùng
      </Link>
      <Link
        to="/send-notification"
        className={`block py-2.5 px-4 rounded transition duration-200 ${
          location.pathname === "/send-notification"
            ? "bg-blue-500"
            : "hover:bg-blue-500"
        }`}
      >
        Gửi thông báo
      </Link>
      <Link
        to="/money-withdrawal"
        className={`block py-2.5 px-4 rounded transition duration-200 ${
          location.pathname === "/notification-list"
            ? "bg-blue-500"
            : "hover:bg-blue-500"
        }`}
      >
        Yêu cầu rút tiền
      </Link>

      {user && (
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative" // Add relative positioning
        >
          <div
            className={`flex items-center justify-between mt-8 transition duration-200 py-2 px-2 rounded ${
              isHovering ? "bg-blue-500" : "hover:bg-blue-500"
            }`}
          >
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  user.avatar ? user.avatar : "https://i.pravatar.cc/150?img=1"
                }
                alt="Avatar"
              />

              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs font-medium text-gray-300">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {isHovering && (
            <div
              onClick={handleLogout}
              className="absolute right-0 w-full transition duration-200 bg-gray-700 text-white-500 hover:text-gray-300 cursor-pointer py-2 px-4 rounded"
            >
              Logout
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
