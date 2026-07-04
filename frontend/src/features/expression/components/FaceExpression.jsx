import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../styles/face.css";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  let stream;

  const [expression, setExpression] = useState("Detecting...");

  // This initialize (every requirement)
  const init = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  };

  // Detect is used to detect the expression
  const detect = () => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now(),
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");
      const jawOpen = getScore("jawOpen");
      const browUp = getScore("browInnerUp");
      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");

      let currentExpression = "Neutral";

      console.log("frownLeft: ", frownLeft);
      console.log("frownRight: ", frownRight);

      if (smileLeft > 0.3 && smileRight > 0.3) {
        currentExpression = "Happy 😄";
      } else if (jawOpen > 0.02 && browUp > 0.02) {
        currentExpression = "Surprised 😲";
      } else if (frownLeft > 0.005 && frownRight > 0.005) {
        currentExpression = "Sad 😢";
      }

      setExpression(currentExpression);
    }
  };

  useEffect(() => {
    init();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="container">
      <video ref={videoRef} className="video" playsInline autoPlay muted />
      <h2>{expression}</h2>
      <button onClick={detect}>Detect Expression</button>
    </div>
  );
}
