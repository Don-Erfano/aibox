"use client";
import { FC, useEffect, useState } from "react";
import { FakeLoadingProps } from "./interface";
import { Loader } from "lucide-react";

const FakeLoading: FC<FakeLoadingProps> = ({ message }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex w-fit items-center overflow-hidden rounded-md outline-1 outline-green-600"
      style={{ direction: "rtl" }}
    >
      <div className="absolute top-0 left-0 h-full w-full bg-green-100"></div>

      <div
        className="absolute top-0 left-0 h-full bg-green-500/80"
        style={{ width: `${progress}%`, transition: "width 1s ease" }}
      />
      <div className="relative z-10 flex w-full items-center justify-between gap-2 px-3 py-2">
        <Loader
          style={{
            animation: "spin 1.5s linear infinite",
          }}
          className="text-slate-700"
          size={24}
        />
        <span className="text-sm leading-6 font-normal text-zinc-800">
          {message}
        </span>
      </div>
    </div>
  );
};

export default FakeLoading;
