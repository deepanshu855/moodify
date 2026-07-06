import { useEffect, useRef, useState } from "react";
import "../styles/face.css";
import { detect, init } from "../utils/utils";

export default function FaceExpression({onClick = () => {}}) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ videoRef, landmarkerRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = () => {
    const expression = detect({ videoRef, landmarkerRef, setExpression });
    onClick(expression);
  };

  return (
    <div className="container">
      <video ref={videoRef} className="video" playsInline autoPlay muted />
      <h2>{expression}</h2>
      <button onClick={handleClick}>Detect Expression</button>
    </div>
  );
}
