import { useEffect, useState, useRef } from "react";

export const RFQTImer = ({
  endTime,
  dispatch,
  apiFunction,
  Data,
  navigate,
}) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date());
  const hasCalled = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = endTime - new Date();

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);

        if (!hasCalled.current && apiFunction) {
          hasCalled.current = true;
          console.log(Data, navigate, "Data, navigate in Timer");
          dispatch(apiFunction({ Data, navigate }));
        }
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, dispatch, apiFunction, Data, navigate]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  if (timeLeft <= 0) return null;

  return (
    <span className="RFQ_TimerStyle">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
};
