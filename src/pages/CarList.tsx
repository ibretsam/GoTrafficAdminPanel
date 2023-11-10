import { useEffect, useState } from "react";

interface Car {
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
  //   const [car, setCar] = useState<Car>([]);

  const cars: Car[] = [];

  useEffect(() => {
    fetch("http://103.57.129.166:3000/car/api/list")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item: Car) => {
          cars.push(item);
        });
        console.log(cars);
      });
  }, []);
  return <div>CarList</div>;
};

export default CarList;
