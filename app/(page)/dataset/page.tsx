"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/images/backgrow.png')", // ปรับ path ให้ถูกต้อง
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Dropdown Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.select
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-mali w-[500px] h-[100px] text-xl border-none appearance-none bg-transparent cursor-pointer text-white"
            style={{
              backgroundImage:
                "url('/images/frame.png')", 
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              outline: "none",
              filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.3))",
              textAlign: "center",
              paddingLeft: "5%", 
              paddingTop: "7%",
              transform: "translateX(-50%)", // ปรับตำแหน่งให้แม่นยำ
            }}
          >
            <option value="" disabled selected hidden>
              กรุณาเลือกข้อมูลที่ต้องการ
            </option>
            <option value="dataset1">Dataset 1</option>
            <option value="dataset2">Dataset 2</option>
            <option value="dataset3">Dataset 3</option>
            <option value="dataset4">Dataset 4</option>
            <option value="dataset5">Dataset 5</option>
          </motion.select>
        </motion.div>

     
        <motion.button
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/information")}
          className="cursor-pointer"
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
  );
}
