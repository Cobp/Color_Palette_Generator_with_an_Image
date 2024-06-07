"use client";

const ShowSelectedComponent = ({ showSelected, children }) => {
  return (
    showSelected && (
      {children}
    )
  );
};

export default ShowSelectedComponent;
