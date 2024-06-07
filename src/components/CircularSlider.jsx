"use client";
import React, { useEffect, useState } from "react";
import itemsData from "@/Content/CircularSlider.json"

const CircularSlider = () => {
  const [items, setItems] = useState(itemsData);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setItems((prevItems) => {
          const newItems = [...prevItems];
          newItems.unshift(newItems.pop());
          return newItems;
        });
        setAnimating(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center translate-x-0 translate-y-[170%] md:translate-y-0 md:translate-x-[140%] lg:translate-x-[100%]">
      <div className={`slider size-80 md:size-96 relative transition-all ${animating ? "animating" : ""}`}>
        {items.map((item, index) => (
          <div key={index} className={`absolute flex items-center justify-center size-80 md:size-96 origin-center item-${index + 1}`}>
            <div
              className={`item flex flex-col items-center w-full h-full justify-center ${animating ? "animating" : ""}`}
            > 
              <div className="relative w-full md:pt-10 bg-white rounded-xl shadow-2xl shadow-black">
                {/* <div className="w-full h-60 object-cover border-2 border-white rounded-xl"></div> */}
                <img className="w-full h-60 object-cover border-2 border-white rounded-xl" src={`/images/${item.src}`} alt={item.alt} />
                <div className="absolute before:absolute md:before:content[''] before:size-4 before:border-2 before:border-neutral-800/20 before:top-3 before:left-2/4 before:rounded-full before:-translate-x-2/4 md:pt-16 md:pb-4 flex md:flex-col top-[90%] right-2/4 translate-x-2/4 md:translate-x-0 md:-top-5 md:-right-5 bg-white shadow-2xl shadow-black rounded-2xl border-2 border-white gap-0.5 overflow-hidden ">
                  <div className="w-7 md:w-16 h-7" style={{background:`${item.color1}`}}></div>
                  <div className="w-7 md:w-16 h-7" style={{background:`${item.color2}`}}></div>
                  <div className="w-7 md:w-16 h-7" style={{background:`${item.color3}`}}></div>
                  <div className="w-7 md:w-16 h-7" style={{background:`${item.color4}`}}></div>
                  <div className="w-7 md:w-16 h-7" style={{background:`${item.color5}`}}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularSlider;
