import { useEffect, useState } from "react";
import { CarItem } from "../components/CarItem";
import { carListData } from "../assets/data";

export interface Car {
  id: number;
  idUser: number;
  idCarBrand: number;
  numberPlate: string;
  name: string;
  yearOfManufacture: number;
  seats: number;
  gear: string;
  fuel: string;
  locationCar: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  fuelConsumption: number;
  isDelivery: boolean;
  limitKm: number;
  price: number;
  utilities: string;
  image: string;
  imageRegister: string;
  imageRegistry: string;
  imageInsurance: string;
  status: number;
  updatedAt: string;
  createdAt: string;
  numberOfBooked: number;
  isRental: boolean;
  isBrowed: boolean;
  rating: number;
  imageThumbnail: string;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    fetch("http://103.57.129.166:3000/car/api/list")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.listCar);
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
            <CarItem car={selectedCar} isApprovalMode={false} />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center text-gray-700">
              Chọn xe để xem chi tiết
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
