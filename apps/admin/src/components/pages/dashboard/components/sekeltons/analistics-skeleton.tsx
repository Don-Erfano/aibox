import { FC } from "react";

const AnalysisSkeleton: FC = () => (
  <div className="flex flex-col">
    <div className="flex items-center justify-between">
      <div className="size-30 animate-pulse rounded-full bg-gray-100" />

      <div className="h-12 w-52 animate-pulse bg-gray-100" />
    </div>
    <div className="mt-8 flex flex-col gap-3">
      <div className="h-12 animate-pulse bg-gray-100" />
      <div className="h-12 animate-pulse bg-gray-100" />
      <div className="h-12 animate-pulse bg-gray-100" />
      <div className="h-12 animate-pulse bg-gray-100" />
    </div>
  </div>
);

export default AnalysisSkeleton;
