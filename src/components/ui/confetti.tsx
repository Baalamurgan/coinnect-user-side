"use client";
import { useEffect } from "react";
import { useReward } from "react-rewards";

export default function Confetti() {
  const { reward: confettiReward, isAnimating: isConfettiAnimating } =
    useReward("confettiReward", "confetti", {
      lifetime: 500,
      elementCount: 200,
      angle: 90,
      spread: 90,
    });

  useEffect(() => {
    confettiReward();
  }, []);

  return (
    <>
      <div id="confettiReward"></div>
      <div id="confettiReward"></div>
    </>
  );
}
