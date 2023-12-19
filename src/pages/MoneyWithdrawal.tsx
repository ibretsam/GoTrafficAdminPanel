import React, { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";

const MoneyWithdrawal: React.FC = () => {
  const [requestList, setRequestList] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const getRequestList = () => {
    fetch("http://103.57.129.166:3000/request/api/get-all")
      .then((res) => res.json())
      .then((data) => {
        setRequestList(data);
      });
  };

  useEffect(() => {
    getRequestList();
  }, []);

  // Sample request list data
  // {
  //   "id": 4,
  //   "idUser": 2,
  //   "bankName": "ABC",
  //   "bankNumber": "13212321",
  //   "amount": 200000,
  //   "status": 1,
  //   "createdAt": "2023-12-02T17:06:15.000Z",
  //   "updatedAt": "2023-12-02T17:06:15.000Z"
  // },

  return (
    <div className="flex ml-64 px-12">
      <div className="w-full mt-10 justify-center">
        <ConfirmModal open={openModal} setOpen={setOpenModal} id={selectedId} />
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Yêu cầu rút tiền
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Danh sách yêu cầu rút tiền của người dùng.
          </p>
        </div>
        <ul className="divide-y divide-gray-100">
          {requestList.map((request) => (
            <li key={request.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div></div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {request.bankNumber} - {request.bankName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {request.amount.toLocaleString("en-US")} VNĐ
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <span className="hidden sm:block">
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      setSelectedId(request.id);
                      setOpenModal(true);
                    }}
                  >
                    Xác nhận
                  </button>
                  <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                    Huỷ bỏ
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

export default MoneyWithdrawal;
