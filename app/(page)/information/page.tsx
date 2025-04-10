"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/backgrow.png')", // ปรับ path ให้ถูกต้อง
      }}
    >
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ top: "250px" }}
      >
        <div className="flex justify-center space-x-4">
          <div className="relative" style={{ width: "500px" }}>
            <img
              src="/images/name.png"
              className=""
            />
            <input
              type="text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="ชื่อ นามสกุล"
              className="font-mali absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl bg-transparent border-none outline-none text-center w-4/5 pt-9 pr-15"
            />
          </div>

          {/* รูป + input 2 */}
          <div className="relative" style={{ width: "500px" }}>
            <img
              src="/images/old.png"
              className=""
            />
            <input
              type="text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="อายุ"
              className="font-mali absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl bg-transparent border-none outline-none text-center w-4/5 pt-9 pr-15"
            />
          </div>
        </div>

        {/* รูป + input 3 (แถวถัดมา) */}
        <div className="mt-6">
          <div className="relative" style={{ width: "500px" }}>
            <img
              src="/images/congenital_disease.png"
              className="pl-2"
            />
            <input
              type="text"
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              placeholder="โรคประจำตัว"
              className="font-mali absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl bg-transparent border-none outline-none text-center w-4/5 pt-9 pr-10"
            />
          </div>
        </div>

        {/* ปุ่มไปหน้าถัดไป */}
        <div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/game1")}
            className="cursor-pointer"
            style={{ marginTop: "10px" }}
          >
            <motion.img
              className="mt-6 drop-shadow-lg"
              src="/images/next.png"
              alt="Next Button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
