"use client";
import { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    url: null,
    title: null,
    slideSize: 0,
    thumbs: [],
    slides: [],
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
