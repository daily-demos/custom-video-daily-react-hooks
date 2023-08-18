import { useState, useEffect, useCallback } from 'react';
import { useAppMessage } from '@daily-co/daily-react';
import './FaceDetector.css';
import FaceDetection from '../../utils/facedetection';

export default function FaceDetector({ id, isLocal, videoRef }) {
  const [detectionEnabled, setDetectionEnabled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [detector, setDetector] = useState();
  const [detectorInterval, setDetectorInterval] = useState();
  const [result, setResult] = useState('');
  const [remoteTracking, setRemoteTracking] = useState();

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback((ev) => {
      if (ev.fromId === id && ev.data.face) {
        setResult(ev.data.face.msg);
      }
      if (ev.fromId === id && 'tracking' in ev.data.face) {
        setRemoteTracking(ev.data.face.tracking);
      }
    }, []),
  });

  const toggleEnabled = () => {
    setDetectionEnabled(!detectionEnabled);
  };

  useEffect(() => {
  }, [remoteTracking]);

  useEffect(() => {
    // Only broadcast face detection for local face, not remotes
    if (isLocal) {
      sendAppMessage({ face: { msg: result } });
    }
  }, [result]);

  useEffect(() => {
    if (detectionEnabled) {
      const newDetector = new FaceDetection({
        video: videoRef,
        resultsCallback: (detections) => {
          if (detections.length > 0) {
            setResult('Detected');
          } else {
            setResult('Not Detected');
          }
        },
      });
      setDetector(newDetector);
      newDetector.detectFaces();
      const i = setInterval(() => {
        newDetector.detectFaces();
      }, 1000);
      setDetectorInterval(i);
      if (isLocal) {
        // Tell others to disable their own face tracking button for this tile
        sendAppMessage({ face: { tracking: true } });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (detectorInterval) {
        clearInterval(detectorInterval);
        setResult('');
      }
      if (isLocal) {
        // Tell others to disable their own face tracking button for this tile
        sendAppMessage({ face: { tracking: false } });
      }
    }
  }, [detectionEnabled]);
  return (
    <div className="facedetector">
      <div className="result">{result}</div>
      <button
        type="button"
        disabled={remoteTracking}
        className={detectionEnabled ? 'on' : 'off'}
        onClick={toggleEnabled}>
        Face
      </button>
    </div>
  );
}
