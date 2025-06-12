import { useGetUserGpuPackage, useGetUserGpuPackageInfo } from '@/services';
import { SemiCircleChart } from '@aibox/ui';
import { Timer } from 'lucide-react';
import { FC } from 'react';

const GpuPackage: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, isFetching } = useGetUserGpuPackage(id);
  const { data: usageData } = useGetUserGpuPackageInfo(id);
  console.log(usageData);

  if (!data || isFetching || isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 py-6 border border-teal-600/70 rounded-xl flex flex-col gap-10">
        <p className="font-semibold text-xl text-teal-600">
          پلن {data?.data.data.plan.name} - {data?.data.data.payment_type} -
          {data?.data.data.gpu_motherboard.gpu.name}
        </p>
        <hr className="border-2 border-teal-600 rounded-full" />
        <div
          className="grid place-content-start xl:grid-cols-5 justify-items-end gap-y-4 gap-x-6 lg:grid-cols-3 grid-cols-1"
          dir="rtl"
        >
          <p className="order-5 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            Disc Storage: {data?.data.data.disk.capacity} GB
          </p>
          <p className="order-4 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            CUDA Cores: {data?.data.data.gpu_motherboard.gpu.cuda_cores}
          </p>
          <p className="order-3 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            Ram per GPU: {data?.data.data.gpu_motherboard.gpu.ram} GB
          </p>
          <p className="order-2 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            CPU Cores: {data?.data.data.gpu_motherboard.motherboard.cpu_cores}
          </p>
          <p className="order-1 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            Reliability: {data?.data.data.gpu_motherboard.gpu.reliability}
          </p>
          <p className="order-6 hidden xl:block" />
          <p className="order-7 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            IDE: {data?.data.data.plan.ide}
          </p>
          <p className="order-8 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2 truncate">
            ...libraries:
            {data?.data.data.plan.libraries.split(', ').slice(0, 2).join(', ')}
          </p>
          <p className="order-9 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            Utilities: {data?.data.data.plan.utilities}
          </p>
          <p className="order-10 text-sm text-gray-800 after:content-[''] after:size-2 after:bg-teal-600 after:block after:rounded-full flex items-center gap-2">
            Max Continuous Usage Hours:{' '}
            {data?.data.data.plan.max_continuous_usage_hours}
          </p>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 gap-6 md:grid-cols-2 grid-cols-1">
        <div className="border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-6 p-5">
          <Timer />
          <h4 className="font-medium text-md text-slate-800">
            زمان پردازش شده
          </h4>
          <h4 className="font-medium text-md text-slate-800">0:23:12</h4>
        </div>
        <div className="border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-8 p-5">
          <h4 className="font-medium text-md text-teal-600">
            زمان استفاده رایگان
          </h4>
          <h4 className="font-medium text-md text-zinc-800">
            10 ساعت{' '}
            <span className="font-normal text-sm text-zinc-600">
              تا 1404/3/1{' '}
            </span>
          </h4>
          <div className="flex flex-col gap-1 w-full">
            <div className="w-full h-2.5 bg-gray-300 rounded-full">
              <div className="w-1/2 h-2.5 bg-teal-600 rounded-full mr-auto" />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-xs">10 ساعت</span>
              <span className="text-gray-500 text-xs">0 ساعت</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg flex flex-col justify-center items-center gap-8 p-5">
          <h4 className="font-medium text-md text-teal-600">حجم مصرف شده</h4>
          <div className="flex flex-col gap-2">
            <SemiCircleChart data={50} label="50%" />
            <div className="flex justify-between -mt-10 px-5">
              <span className="text-gray-500 text-xs">200 GB</span>
              <span className="text-gray-500 text-xs">0 GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpuPackage;
