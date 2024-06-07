"use client";
import React, { useState, useRef, useEffect } from 'react';

const WrapperComponent = ({ children }) => {
  const [showSelected, setShowSelected] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isClicked) {
      setShowSelected(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      timeoutRef.current = setTimeout(() => {
        setShowSelected(false);
      }, 1000);
    }
  };

  const handleClick = () => {
    setShowSelected(!showSelected);
    setIsClicked(!isClicked);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowSelected(false);
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            showSelected,
            handleClick,
          });
        }
        return child;
      })}
    </div>
  );
};

export default WrapperComponent;
