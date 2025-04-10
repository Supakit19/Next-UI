import React from "react";
import { FaUser, FaStar, FaVolumeUp, FaFlagCheckered } from "react-icons/fa"; // ใช้ react-icons

const CustomUI = () => {
  return (
    <div className="">
      <div
        className="relative bg-[#DDE1FF] w-full h-20 flex items-center justify-center shadow-lg"
        style={{
          clipPath: "polygon(20% 200%, 0% 0%, 100% 0%, 80% 200%)",
          borderBottom: "4px solid white",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-full bg-white"
          style={{
            clipPath: "polygon(22% 10%, 10% 10%, 50% 50%, 78% 0%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[90%] bg-[#DDE1FF]"
          style={{
            clipPath: "polygon(24% 100%, 2% 0%, 10% 10%, 76% 0%)",
          }}
        ></div>
        <div className="absolute flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-700 text-2xl" title="User Icon" />
            <span className="font-mali text-black text-lg font-bold mt-1">
              ชื่อผู้ใช้
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-500 text-2xl" title="Star Icon" />
            <span className="font-mali text-black text-lg font-bold mt-1">
              คะแนน
            </span>
          </div>
          <FaVolumeUp className="text-blue-500 text-2xl" title="Speaker Icon" />
          {/* เพิ่มแสดงด่านปัจจุบัน */}
          <div className="flex items-center space-x-2">
            <FaFlagCheckered
              className="text-green-500 text-2xl"
              title="Level Icon"
            />
            <span className="font-mali text-black text-lg font-bold mt-1">
              ถึงด่านที่ 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomUI;
