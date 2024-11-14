"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type StoreItem = {
  name: string;
  address: string;
};

interface ApiResponse {
  count: number;
  item: StoreItem[];
}

const location_name: { [key: string]: string } = {
  서울: "seoul",
  부산: "busan",
  대구: "daegu",
  인천: "incheon",
  광주: "gwangju",
  대전: "daejeon",
  울산: "ulsan",
  경기: "gyeonggi",
  강원: "gangwon",
  충북: "chungbuk",
  충남: "chungnam",
  전북: "jeolbuk",
  전남: "jeolnam",
  경북: "gyeongbuk",
  경남: "gyeongnam",
  제주: "jeju",
};

export default function StorePage() {
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [storeList, setStoreList] = useState<StoreItem[]>([]);
  const [locationCounts, setLocationCounts] = useState<{
    [key: string]: number;
  }>({});
  const [totalStoreCount, setTotalStoreCount] = useState(0);

  const fetchAllCounts = async () => {
    const counts: { [key: string]: number } = {};
    await Promise.all(
      Object.entries(location_name).map(async ([region, code]) => {
        try {
          const response = await fetch(
            `https://websseu.github.io/pythonStarbucks/location/${code}/${code}_2024-11-12.json`
          );
          const data: ApiResponse = await response.json();
          counts[region] = data.count;
          if (region === "서울") setStoreList(data.item);
        } catch (error) {
          console.error(`Error fetching data for ${region}:`, error);
        }
      })
    );
    setLocationCounts(counts);

    const total = Object.values(counts).reduce((acc, count) => acc + count, 0);
    setTotalStoreCount(total);
  };

  useEffect(() => {
    fetchAllCounts();
  }, []);

  const handleRegionClick = async (region: string) => {
    setSelectedRegion(region);
    const code = location_name[region];
    try {
      const response = await fetch(
        `https://websseu.github.io/pythonStarbucks/location/${code}/${code}_2024-11-12.json`
      );
      const data: ApiResponse = await response.json();
      setStoreList(data.item); // 선택한 지역의 매장 리스트 업데이트
    } catch (error) {
      console.error(`Error fetching data for ${region}:`, error);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto mt-10 px-4 NanumSquareNeo">
      <h2 className="text-center mb-10 flex justify-center relative">
        <span className="inline-block relative">
          <Image
            src={"/starbucks.png"}
            alt="스타벅스"
            width={60}
            height={60}
            className="rounded-[14px] border border-[#f0f0f0]"
          />
          <span className="text-[11px] absolute right-[-15px] top-[-12px] bg-red-600 text-white rounded-full text-center px-2 py-1">
            {totalStoreCount}
          </span>
        </span>
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(location_name).map((location) => (
          <span
            key={location}
            className={`local ${
              selectedRegion === location
                ? "bg-blue-100 text-blue-800 border-blue-800"
                : ""
            }`}
            onClick={() => handleRegionClick(location)}
          >
            {location} <i className="length">{locationCounts[location] || 0}</i>
          </span>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="NanumSquareNeo mb-1">{selectedRegion} 스타벅스</h2>
        <ul className="border-t border-black">
          {storeList.map((store, index) => (
            <li key={index} className="list">
              <span className="px-4 w-12">{index + 1}</span>.
              <span className="py-2 px-4 w-52">{store.name}</span>
              <span>{store.address}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
