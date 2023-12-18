import React from "react";

const MoneyWithdrawal: React.FC = () => {
  return (
    <div className="flex ml-64 px-12">
      <div className="space-y-12 mt-10 justify-center">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Yêu cầu rút tiền
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Danh sách yêu cầu rút tiền của người dùng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyWithdrawal;
