import { useContext, useEffect } from "react";
import { SongContext } from "../SongProvider";
import { getPlaylist, getSong } from "../services/song.api";

export const useSong = () => {
  const { song, setSong, loading, setLoading, playlist, setPlaylist } =
    useContext(SongContext);

  const handleGetSong = async ({ mood }) => {
    setLoading(true);
    try {
      const response = await getSong({ mood });
      setSong(response.song);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetPlaylist = async ({ mood }) => {
    setLoading(true);
    try {
      const response = await getPlaylist({ mood });
      setPlaylist(response.songs);
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
    song,
    setSong,
    playlist,
    handleGetSong,
    handleGetPlaylist,
  };
};
