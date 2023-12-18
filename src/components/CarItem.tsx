import { Car } from "../pages/CarList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Line: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
};

export const CarItem: React.FC<{ car: Car; isApprovalMode: boolean }> = ({
  car,
  isApprovalMode,
}) => {
  let images = [];
  if (car.image) {
    try {
      images = JSON.parse(car.image.slice(1, -1));
    } catch (error) {
      console.log(error);
      images.push(car.image);
    }
  }

  const handleApprove = async (isApproval: boolean) => {
    let url = `http://103.57.129.166:3000/car/api/${
      isApproval ? "browse" : "refuse-car"
    }?idCar=${car.id}`;
    console.log(url);
    if (isApproval) {
      await fetch(url, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result === true) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Có lỗi xảy ra");
        });
    }
  };

  return (
    <div className="flex items-stretch flex-col bg-white shadow-md rounded-lg p-6 ml-64">
      <div style={{ width: "50rem" }} className="flex self-center">
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
        <div className="px-4 sm:px-0 flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {car.name}
          </h2>
          {isApprovalMode && (
            <div>
              <button
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 mr-4 transition duration-200"
                onClick={() => handleApprove(true)}
              >
                Duyệt
              </button>
              <button
                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition duration-200"
                onClick={() => handleApprove(false)}
              >
                Từ chối
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <Line title="Năm sản xuất" value={car.yearOfManufacture.toString()} />
          <Line title="Đia điểm" value={car.locationCar} />
          <Line title="Thành phố" value={car.city} />
          <Line title="Quận/Huyện" value={car.district} />
          <Line title="Phường/Xã" value={car.ward} />
          <Line title="Mô tả" value={car.description} />
          <Line title="Giá" value={car.price.toString()} />
        </div>
      </div>
    </div>
  );
};
