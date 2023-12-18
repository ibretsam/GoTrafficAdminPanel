import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  gender: boolean;
  dob: string;
  avatar: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  address: string;
  longitude: number;
  latitude: number;
  surplus: number;
  status: string;
  role: number;
  isLogin: boolean;
  isActive: boolean;
  verificationCode: number | null;
  verificationCodeMail: number;
  isVerifiedDriverLicense: boolean;
  isVerifiedPhone: boolean;
  isVerifiedEmail: boolean;
  rating: number;
  totalRide: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://103.57.129.166:3000/user/api/list")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-grow ml-64 justify-center mt-10 pb-14 px-16">
      <div className="w-1/2 max-h-screen">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Thông tin người dùng
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Danh sách tài khoản đang hoạt động
          </p>
        </div>
        <ul className="divide-y divide-gray-100">
          {users.map((person) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.avatar}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <span className="hidden sm:block">
                  <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                    Vô hiệu hóa
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
