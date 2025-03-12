"use client";
import { useEffect } from "react";
import { useReward } from "react-rewards";

export default function Confetti({ spread = 90 }: { spread?: number }) {
  const { reward: confettiReward } = useReward("confettiReward", "confetti", {
    lifetime: 500,
    elementCount: 200,
    angle: 90,
    spread,
  });

  useEffect(() => {
    confettiReward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="confettiReward"></div>
      <div id="confettiReward"></div>
    </>
  );
}
