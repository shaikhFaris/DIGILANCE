import React, { useState } from "react";
import { FaSearchLocation, FaRegWindowClose } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setter } from "../redux/destLatLang/destLatLangSlice.js";
// import "./App.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const destLatLang = useSelector((state) => state.destLatLang.value);

  const [Destplace, setDestplace] = useState("");
  const [DestData, setDestData] = useState([]);
  const [checkprint, setcheckprint] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);

  const handleCloseClick = () => {
    setToggleOptions(false);
  };

  const handleSelectDestClick = (location) => {
    console.log("clicked");
    dispatch(setter(location));
    // console.log(destLatLang);
  };

  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    setDestplace(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    setToggleOptions(true);
    if (Destplace != "") {
      await fetch(
        `http://localhost:4331/api/getDestinationData?place=${Destplace}`,
        {
          method: "GET",
        }
      )
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          if (data == null) {
            setcheckprint(false);
          } else {
            // console.log(data);
            setDestData(data);
            setcheckprint(true);
          }
        });
    } else {
      setcheckprint(false);
      console.log("please enter something in search bar");
    }
  };

  return (
    <>
      <div className="absolute top-0 z-10 w-full h-[85px] flex-col  flex items-center justify-center border border-black">
        {/* <h1 className="text-white font-medium text-2xl">DIGILANCE</h1> */}
        <form
          className="w-4/12 h-10 bg-white rounded-full flex p-1 items-center justify-around"
          id="search-bar-div"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            className="h-full rounded-full w-10/12 p-2 focus:outline-none "
            placeholder="Search hospitals"
            onChange={handleSearchChange}
            minLength={3}
            maxLength={40}
          />
          <button className="focus:bg-slate-300" type="submit">
            <FaSearchLocation size={20} />
          </button>
        </form>
        {toggleOptions && (
          <div
            className="absolute top-[70px] w-1/3 bg-white h-96 rounded-xl overflow-auto p-3 scroll-smooth"
            id="search-bar-div"
          >
            <FaRegWindowClose
              className="absolute right-0 top-0"
              size={30}
              onClick={handleCloseClick}
            />
            {checkprint ? (
              DestData.map((element, index) => {
                // console.log(element.name);
                return (
                  <div
                    key={index}
                    className="h-24 mt-3 p-1 pl-3 bg-green-200 rounded-xl overflow-hidden focus:bg-green-900 hover:bg-green-400
                     duration-300 hover:cursor-pointer hover:-translate-y-1 hover:scale-105"
                    onClick={() => {
                      handleSelectDestClick(element.location);
                    }}
                  >
                    <h2 className="text-blue-800 font-medium">
                      {element.name}
                    </h2>
                    <p className="text-xs mt-1">{element.description}</p>
                  </div>
                );
              })
            ) : (
              <div className="h-full w-full text-5xl leading-relaxed font-extrabold text-center">
                <br /> FIRST WRITE <br /> SOMETHING!
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
