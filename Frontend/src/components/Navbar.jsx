import React from "react";
import { FaSearchLocation } from "react-icons/fa";
// import "./App.css";

export default function Navbar() {
  return (
    <div className="absolute top-0 z-10 w-full h-20 flex items-center justify-center">
      {/* <h1 className="text-white font-medium text-2xl">DIGILANCE</h1> */}
      <div
        className="w-4/12 h-10 bg-white rounded-full flex p-1 items-center justify-around"
        id="search-bar-div"
      >
        <input
          type="text"
          className="h-full rounded-full w-10/12 p-2 focus:outline-none"
          placeholder="Search hospitals"
        />
        <button className="focus:bg-slate-300">
          <FaSearchLocation size={20} />
        </button>
      </div>
    </div>
  );
}
