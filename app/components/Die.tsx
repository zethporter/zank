import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

const randomDieValue = () => Math.ceil(Math.random() * 6);

const Die = ({ value }: { value: number | null }) => {
  const [_value, setValue] = useState<number>(value ?? randomDieValue());
  useEffect(() => {
    let intervalId: any;

    if (value === null) {
      // Start the animation
      intervalId = setInterval(() => {
        setValue(randomDieValue());
      }, 300);
    } else {
      // When value is provided, update currentValue
      setValue(value);
    }

    // Cleanup interval when component unmounts or value changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [value]);

  const pipClass = ["rounded-full", "bg-accent-content", "w-full", "h-full"];
  const classes = [
    [
      pipClass,
      ["col-start-1", "row-start-1", { hidden: [1].includes(_value) }],
    ],
    [
      pipClass,
      ["col-start-3", "row-start-1", { hidden: [1, 2, 3].includes(_value) }],
    ],
    [
      pipClass,
      [
        "col-start-1",
        "row-start-2",
        { hidden: [1, 2, 3, 4, 5].includes(_value) },
      ],
    ],
    [
      pipClass,
      ["col-start-2", "row-start-2", { hidden: [2, 4, 6].includes(_value) }],
    ],
    [
      pipClass,
      [
        "col-start-3",
        "row-start-2",
        { hidden: [1, 2, 3, 4, 5].includes(_value) },
      ],
    ],
    [
      pipClass,
      ["col-start-1", "row-start-3", { hidden: [1, 2, 3].includes(_value) }],
    ],
    [
      pipClass,
      ["col-start-3", "row-start-3", { hidden: [1].includes(_value) }],
    ],
  ];
  return (
    <div
      className={twMerge(
        clsx([
          "aspect-square",
          "rounded-field",
          "border-none",
          "bg-radial-[at_50%_75%] from-secondary to-accent to-90%",
          "gap-2",
          "p-3",
          "grid grid-cols-3 grid-rows-3",
          "w-1/4 sm:1/5 md:1/6 lg:w-52",
        ]),
      )}
    >
      <div className={twMerge(clsx())}></div>
      {classes.map((classes, i) => (
        <div key={i} className={twMerge(clsx(classes))}></div>
      ))}
    </div>
  );
};

export default Die;
