"use client";

import { useEffect, useState } from "react";

export function AnimatedBoxes() {
  const [lightUpBoxes, setLightUpBoxes] = useState<Set<number>>(new Set());
  const [staticBoxes, setStaticBoxes] = useState<Set<number>>(new Set());
  const [boxesPerRow, setBoxesPerRow] = useState(60);

  useEffect(() => {
    const updateBoxesPerRow = () => {
      if (window.innerWidth < 640) {
        // sm
        setBoxesPerRow(20);
      } else if (window.innerWidth < 768) {
        // md
        setBoxesPerRow(30);
      } else if (window.innerWidth < 1024) {
        // lg
        setBoxesPerRow(40);
      } else {
        setBoxesPerRow(62);
      }
    };

    updateBoxesPerRow();
    window.addEventListener("resize", updateBoxesPerRow);

    return () => window.removeEventListener("resize", updateBoxesPerRow);
  }, []);

  useEffect(() => {
    const totalBoxes = 7 * boxesPerRow;

    // Set initial static boxes
    const initialStatic = new Set<number>();
    const staticCount = Math.floor(totalBoxes * 0.05); // 5% of boxes are static
    for (let i = 0; i < staticCount; i++) {
      initialStatic.add(Math.floor(Math.random() * totalBoxes));
    }
    setStaticBoxes(initialStatic);

    const interval = setInterval(() => {
      const numBoxesToLight = Math.floor(Math.random() * 6) + 3; // 3-8 boxes
      const boxesToLight = new Set<number>();

      for (let i = 0; i < numBoxesToLight; i++) {
        const randomBox = Math.floor(Math.random() * totalBoxes);
        boxesToLight.add(randomBox);
      }

      setLightUpBoxes(boxesToLight);
    }, 2000);

    return () => clearInterval(interval);
  }, [boxesPerRow]);

  const colors = [
    "bg-pink-800/30",
    "bg-yellow-800/30",
    "bg-green-800/30",
    "bg-orange-800/30",
  ];
  const staticColors = [
    "bg-pink-800/30",
    "bg-yellow-800/30",
    "bg-green-800/30",
    "bg-orange-800/30",
  ];

  return (
    <div className="w-full overflow-hidden">
      {Array.from({ length: 7 }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {Array.from({ length: boxesPerRow }, (_, colIndex) => {
            const boxIndex = rowIndex * boxesPerRow + colIndex;
            const isLitUp = lightUpBoxes.has(boxIndex);
            const isStatic = staticBoxes.has(boxIndex);

            let boxColor = "";
            if (isLitUp) {
              boxColor = colors[Math.floor(Math.random() * colors.length)];
            } else if (isStatic) {
              boxColor = staticColors[boxIndex % staticColors.length];
            }

            return (
              <div
                key={boxIndex}
                className={`w-5 h-5 border border-gray-300 transition-all duration-500 ${boxColor}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
