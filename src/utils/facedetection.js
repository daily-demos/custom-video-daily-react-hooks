import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

export default class FaceDetection {
  constructor({ video: videoEl, resultsCallback }) {
    const initializefaceDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
      );
      this.faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
          delegate: 'GPU',
        },
        runningMode: 'IMAGE',
      });
    };
    initializefaceDetector();

    this.videoElement = videoEl;

    this.resultsCallback = resultsCallback;
  }

  async detectFaces() {
    // If there video isn't ready yet, just loop again
    if (this.faceDetector) {
      const d = this.faceDetector.detect(this.videoElement.current).detections;
      if (this.resultsCallback) {
        this.resultsCallback(d);
      }
    }
  }
}
