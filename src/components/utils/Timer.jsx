import { useEffect, useState } from "react";

export const RFQTImer = ({
  endTime,
  dispatch,
  apiFunction,
  Data,
  navigate,
}) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date());
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setHasExpired(true);
      if (apiFunction) {
        console.log(Data, navigate, "Data, navigate in Timer");
        dispatch(apiFunction({ Data, navigate }));
      }
      return;
    }

    const interval = setInterval(() => {
      const remaining = endTime - new Date();

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setHasExpired(true);

        if (apiFunction) {
          console.log(Data, navigate, "Data, navigate in Timer");

          dispatch(apiFunction({ Data, navigate }));
        }
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, dispatch, apiFunction]);

  if (hasExpired) {
    return;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <span className='RFQ_TimerStyle'>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
};
