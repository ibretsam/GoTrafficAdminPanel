import { useEffect, useState } from "react";
import { Car } from "./CarList";
import { carListData } from "../assets/data";
import { CarItem } from "../components/CarItem";

const CarApproval = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    fetch("http://103.57.129.166:3000/car/api/get-not-browser-car")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.car);
        console.log(cars);
      })
      .catch((error) => {
        console.log(error);
        setCars(carListData.listCar);
      });
  }, []);

  const handleCarChoose = (car: Car) => {
    if (selectedCar === car) {
      setSelectedCar(null);
    } else {
      setSelectedCar(car);
    }
  };

  return (
    <div>
      <div className="flex ml-64">
        <div className="fixed h-screen  bg-gray-200 text-gray-800 w-64 space-y-6 px-4 py-7">
          {cars.map((car) => (
            <div
              onClick={() => handleCarChoose(car)}
              key={car.id}
              className={` cursor-pointer block py-2.5 px-4 rounded transition duration-200 ${
                car === selectedCar
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              {car.name}
            </div>
          ))}
        </div>
        {selectedCar ? (
          <div className="flex-grow px-4">
            <CarItem car={selectedCar} isApprovalMode={true} />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center min-h-screen bg-gray-100 ml-64">
            <h1 className="text-2xl font-bold text-center text-gray-700">
              Chọn xe để duyệt
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarApproval;
