import { useEffect, useState, useRef, useMemo } from "react";

export const RFQTimer = ({
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

  // Parse time into milliseconds
  const parseRFQTime = (time) => {
    if (!time) return 0;

    if (/^\d{14}$/.test(time)) {
      const year   = time.slice(0, 4);
      const month  = time.slice(4, 6);
      const day    = time.slice(6, 8);
      const hour   = time.slice(8, 10);
      const minute = time.slice(10, 12);
      const second = time.slice(12, 14);

      return new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}`
      ).getTime();
    }

    return new Date(time.replace(" ", "T")).getTime();
  };

  const serverMs = useMemo(() => parseRFQTime(severTime), [severTime]);
  const endMs    = useMemo(() => parseRFQTime(endTime),   [endTime]);

  // Store simulated server time (this will tick forward)
  const [currentServerMs, setCurrentServerMs] = useState(serverMs);

  // Calculate remaining seconds purely from server timeline
  const getRemainingSeconds = (current) => {
    return Math.max(0, Math.ceil((endMs - current) / 1000));
  };

  const [secondsLeft, setSecondsLeft] = useState(() =>
    getRemainingSeconds(serverMs)
  );

  useEffect(() => {
    // Reset when new RFQ comes
    setCurrentServerMs(serverMs);
    hasCalled.current = false;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const initial = getRemainingSeconds(serverMs);
    setSecondsLeft(initial);

    if (initial <= 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentServerMs((prev) => {
        const updated = prev + 1000; // move server time forward by 1 sec
        const secs = getRemainingSeconds(updated);

        setSecondsLeft(secs);

        if (secs <= 0) {
          clearInterval(intervalRef.current);

          if (!hasCalled.current && apiFunction) {
            hasCalled.current = true;
            dispatch(apiFunction({ Data, navigate }));
          }
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [rfqId, serverMs, endMs]);

  if (secondsLeft <= 0) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <span className="RFQ_TimerStyle">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
};