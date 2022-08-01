import { useState} from "react";

export const useHandRaising = () => {
  const [isHandRaised, setIsHandRaised] = useState(false);
 const toggleHandRaising = () => {
  if (isHandRaised) {
    console.log('hand is raised');
    setIsHandRaised(false);
  }
  if (!isHandRaised) {
    console.log('hand lowered');
    setIsHandRaised(true)
  }
 }

 return { toggleHandRaising, isHandRaised}
};
