"use client";
import React, { useState } from 'react';
import { IconCopy, IconPickerColor } from "@/Icons/mainIcons";

const ColorDisplay = ({ colors, copyToClipboard, handleColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(colors);

  const colorPicker = async (index) => {
    if (!window.EyeDropper) {
      alert('EyeDropper API no está soportada en este navegador.');
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      const newColors = [...selectedColor];
      newColors[index] = sRGBHex;
      setSelectedColor(newColors);
      handleColorChange({ target: { value: sRGBHex } }, index);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mt-6 gap-4">
      {selectedColor.map((color, index) => (
        <div key={index} className="cursor-pointer">
          <div
            className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-full hover:-translate-x-5 transition-all ease-in-out border-4 border-[var(--Background-Colour)] scale-150 mb-10"
            style={{
              backgroundColor: color,
            }}
          >
            <div className="flex opacity-1 gap-1">
              <button
                type="button"
                onClick={() => colorPicker(index)}
                className="w-5 h-5 p-1 hover:bg-slate-100/20 rounded-full cursor-pointer"
              >
                <IconPickerColor />
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(color)}
                className="w-5 h-5 p-1 hover:bg-slate-100/20 rounded-full cursor-pointer"
              >
                <IconCopy />
              </button>
            </div>
            <p className="text-[10px] text-white text-center uppercase mix-blend-difference">
              {color}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorDisplay;
