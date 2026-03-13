import { useEffect, useState, useRef, useMemo } from "react";

let globalServerOffset = null;

export const RFQTImer = ({
  severTime,
  endTime,
  rfqId,
  dispatch,
  apiFunction,
  Data,
  navigate,
}) => {
  const intervalRef = useRef(null);
  const hasCalled = useRef(false);

  const parseRFQTime = (time) => {
    if (!time) return 0;

    if (/^\d{14}$/.test(time)) {
      const year = time.slice(0, 4);
      const month = time.slice(4, 6);
      const day = time.slice(6, 8);
      const hour = time.slice(8, 10);
      const minute = time.slice(10, 12);
      const second = time.slice(12, 14);

      return new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}`
      ).getTime();
    }

    return new Date(time.replace(" ", "T")).getTime();
  };

  const serverMs = useMemo(() => parseRFQTime(severTime), [severTime]);
  const endMs = useMemo(() => parseRFQTime(endTime), [endTime]);

  // ✅ calculate offset only once globally
  if (globalServerOffset === null && serverMs) {
    globalServerOffset = Date.now() - serverMs;
  }

  const [timeLeft, setTimeLeft] = useState(
    endMs - (Date.now() - globalServerOffset)
  );

  useEffect(() => {
    hasCalled.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now() - globalServerOffset;
      const remaining = endMs - now;

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setTimeLeft(0);

        if (!hasCalled.current && apiFunction) {
          hasCalled.current = true;
          dispatch(apiFunction({ Data, navigate }));
        }
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [rfqId, endMs]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  if (timeLeft <= 0) return null;

  return (
    <span className='RFQ_TimerStyle'>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
};
