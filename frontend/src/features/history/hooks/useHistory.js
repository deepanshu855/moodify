import { useContext } from "react";
import { HistoryContext } from "../HistoryContextProvider";
import { getHistory, createHistory } from "../services/histroy.api";

export const useHistory = () => {
  const { loading, setLoading, history, setHistory } =
    useContext(HistoryContext);

  const handleGetHistory = async () => {
    setLoading(true);
    try {
      const response = await getHistory();
      setHistory(response.history.reverse());
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHistory = async (mood) => {
    setLoading(true);
    try {
      console.log(mood);
      const response = await createHistory(mood);
      await handleGetHistory();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    history,
    handleGetHistory,
    handleCreateHistory,
  };
};
