"use client"
import { createContext, useContext, useState } from "react";

const PreviousRouteContext = createContext(null);

export const PreviousRouteProvider = ({ children }) => {
    const [previousRoute, setPreviousRoute] = useState('/');

    return (
        <PreviousRouteContext.Provider value={{ previousRoute, setPreviousRoute }}>
            {children}
        </PreviousRouteContext.Provider>
    );
};

export const usePreviousRoute = () => useContext(PreviousRouteContext);
