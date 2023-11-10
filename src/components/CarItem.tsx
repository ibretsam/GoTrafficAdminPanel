import { Car } from "../pages/CarList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const CarItem: React.FC<Car> = (car) => {
  const images = JSON.parse(car.image);
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
      <div style={{ width: "82rem" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex justify-center">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="max-h-96 w-90 h-50 justify-center"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">{car.name}</h2>
        <p className="text-gray-600">{car.yearOfManufacture}</p>
        <p className="text-gray-600">{car.locationCar}</p>
        <p className="text-gray-600">{car.city}</p>
        <p className="text-gray-600">{car.district}</p>
        <p className="text-gray-600">{car.ward}</p>
        <p className="text-gray-600">{car.description}</p>
        <p className="text-gray-600">{car.price}</p>
      </div>
    </div>
  );
};
