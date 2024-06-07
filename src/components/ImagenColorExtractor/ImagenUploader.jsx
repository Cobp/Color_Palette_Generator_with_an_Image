"use client";
import { useState } from "react";
import { IconUploadLine, IconX } from "@/Icons/mainIcons";

const ImageUploader = ({
  handleImageUpload,
  handleDrop,
  handleDragOver,
  handleRemoveImage,
  imagePreview,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDropWrapper = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      handleDrop(e);
    } else {
      alert("Solo se permiten archivos de imagen (JPG, JPEG, PNG).");
    }
  };

  return (
    <>
      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Color Generate with Image"
            className="h-96 rounded-2xl shadow-2xl"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 active:scale-90 text-white size-8 flex items-center justify-center rounded-full"
          >
            <IconX />
          </button>
        </div>
      ) : (
        <label
          htmlFor="file"
          onDrop={handleDropWrapper}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`max-w-2xl w-full h-96 flex flex-col items-center justify-center border-2 border-dashed shadow-2xl rounded-3xl select-none overflow-hidden cursor-pointer hover:bg-emerald-900/10 active:bg-emerald-600/20 hover:border-emerald-700 transition-all duration-300 ${
            isDragging
              ? "border-emerald-500/20 bg-emerald-700/20 ring-2 ring-offset-2 ring-emerald-600"
              : "border-emerald-500/20"
          }`}
        >
          <i className="size-14 mb-3">
            <IconUploadLine />
          </i>
          <div className="flex flex-col text-sm text-zinc-500 text-center">
            <p><span className="text-emerald-600 hover:underline hover:text-emerald-400">Click to browse</span> or drag & drop</p>
            <span>JPGE, JPG, PNG only</span>
          </div>

          <input
            id="file"
            type="file"
            onChange={handleImageUpload}
            accept="image/jpeg, image/jpg, image/png"
            className="hidden"
          />
        </label>
      )}
    </>
  );
};

export default ImageUploader;
