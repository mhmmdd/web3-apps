import React from "react";
import Image from "next/image";

export default function EthRates({ ethPrice, ethPerItemPrice }) {
  return (
    <div className="grid grid-cols-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex item-center">
            <Image src="/small-eth.webp" width={35} height={35} alt="eth" />
            <span className="text-2xl font-bold">= ${ethPrice}</span>
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex item-center">
            <span className="text-2xl font-bold">{ethPerItemPrice}</span>
            <Image src="/small-eth.webp" width={35} height={35} alt="eth" />
            <span className="text-2xl font-bold">= $15</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
