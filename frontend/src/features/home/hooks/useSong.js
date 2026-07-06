import { useContext } from "react";
import { SongContext } from "../SongProvider";
import { getSong } from "../services/song.api";

export const useSong = () => {
  const { song, setSong, loading, setLoading } = useContext(SongContext);

  const handleGetSong = async ({ mood }) => {
    setLoading(true);
    try {
      const response = await getSong({ mood });
      setSong(response.song);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    song,
    handleGetSong,
  };
};
