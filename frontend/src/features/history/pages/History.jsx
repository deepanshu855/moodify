import React, { useEffect } from "react";
import { useHistory } from "../hooks/useHistory";
import HistoryCard from "../components/HistoryCard";
import Navbar from "../../shared/components/Navbar";
import { Activity, Clock, Calendar, Inbox, Loader2 } from "lucide-react";
import "../styles/history.css";
import GetHistory from "../components/GetHistory";

const History = () => {
  return <>
    <Navbar/>
    <GetHistory/>
  </>;
};

export default History;
