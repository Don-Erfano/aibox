import { weekDaysInRow } from '../../constants';

const WeekDays = () => {
  return (
    <div className="grid w-[304px] grid-cols-7 rounded-md bg-gray-100 py-1.5">
      {weekDaysInRow.map((item) => (
        <p key={item} className="text-[14px] font-normal text-center">
          {item[0]}
        </p>
      ))}
    </div>
  );
};

export default WeekDays;
