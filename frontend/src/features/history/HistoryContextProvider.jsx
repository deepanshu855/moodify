import { createContext, useState } from "react";

export const HistoryContext = createContext();

const HistoryContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  return (
    <HistoryContext.Provider
      value={{ loading, setLoading, history, setHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
