"use client";
import { useState } from "react";
import ImageUploader from "./ImagenUploader.jsx";
import ColorDisplay from "./ColorDisplay.jsx";

const ImageColorExtractor = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(
    "Seleccione una imagen (JPG, JPEG, PNG)"
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processImage = (file) => {
    setLoading(true);
    setAlerta("Procesando la imagen...");
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(reader.result);
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const sampleSize = Math.max(
          10,
          Math.min(image.width, image.height) / 3
        );

        canvas.width = image.width / sampleSize;
        canvas.height = image.height / sampleSize;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        const colorCounts = {};

        for (let i = 0; i < imageData.length; i += 4) {
          const color = `#${imageData[i]
            .toString(16)
            .padStart(2, "0")}${imageData[i + 1]
            .toString(16)
            .padStart(2, "0")}${imageData[i + 2]
            .toString(16)
            .padStart(2, "0")}`;
          if (colorCounts[color]) {
            colorCounts[color]++;
          } else {
            colorCounts[color] = 1;
          }
        }

        const sortedColors = Object.keys(colorCounts).sort(
          (a, b) => colorCounts[b] - colorCounts[a]
        );

        const mostProminentColor = sortedColors[0];
        const darkestColor = sortedColors.reduce((darkest, color) => {
          const brightness =
            parseInt(color.slice(1, 3), 16) * 0.299 +
            parseInt(color.slice(3, 5), 16) * 0.587 +
            parseInt(color.slice(5, 7), 16) * 0.114;
          if (
            brightness <
            parseInt(darkest.slice(1, 3), 16) * 0.299 +
              parseInt(darkest.slice(3, 5), 16) * 0.587 +
              parseInt(darkest.slice(5, 7), 16) * 0.114
          ) {
            return color;
          }
          return darkest;
        }, sortedColors[0]);

        const otherColors = sortedColors.slice(1, 4);
        const allColors = [mostProminentColor, darkestColor, ...otherColors];
        const orderedColors = allColors.sort((a, b) => {
          const brightnessA =
            parseInt(a.slice(1, 3), 16) * 0.299 +
            parseInt(a.slice(3, 5), 16) * 0.587 +
            parseInt(a.slice(5, 7), 16) * 0.114;
          const brightnessB =
            parseInt(b.slice(1, 3), 16) * 0.299 +
            parseInt(b.slice(3, 5), 16) * 0.587 +
            parseInt(b.slice(5, 7), 16) * 0.114;
          return brightnessB - brightnessA;
        });

        setColors(orderedColors);
        setLoading(false);
      };
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Copiado: ${color}`);
  };

  const handleColorChange = (e, index) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setColors([]);
    setAlerta("Seleccione una imagen (JPG, JPEG, PNG)");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <ImageUploader
        handleImageUpload={handleImageUpload}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleRemoveImage={handleRemoveImage}
        imagePreview={imagePreview}
      />
      <div>
        {loading && <p>{alerta}</p>}
        {colors.length > 0 && (
          <ColorDisplay
            colors={colors}
            copyToClipboard={copyToClipboard}
            handleColorChange={handleColorChange}
          />
        )}
      </div>
    </div>
  );
};

export default ImageColorExtractor;
