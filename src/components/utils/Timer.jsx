import { useEffect, useState, useRef, useMemo } from "react";

// Cache to store calculated server offsets (per unique server time)
// Helps avoid recalculating offset again and again
const serverOffsetCache = new Map();

export const RFQTimer = ({
  severTime,
  endTime,
  rfqId,
  dispatch,
  apiFunction,
  Data,
  navigate,
}) => {
  // Reference to store interval ID so we can clear it
  const intervalRef = useRef(null);

  // Prevent API from being called multiple times when timer hits 0
  const hasCalled = useRef(false);

  /**
   * Converts RFQ time into milliseconds
   * Supports:
   * 1. "YYYYMMDDHHMMSS" (14-digit format)
   * 2. Standard datetime string (e.g. "2024-03-13 10:30:00")
   */
  const parseRFQTime = (time) => {
    if (!time) return 0;

    // Handle compact numeric format
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

    // Handle normal datetime string
    return new Date(time.replace(" ", "T")).getTime();
  };

  // Convert server and end time into milliseconds
  const serverMs = useMemo(() => parseRFQTime(severTime), [severTime]);
  const endMs    = useMemo(() => parseRFQTime(endTime),   [endTime]);

  /**
   * Calculate time offset between client and server
   * offset = (client current time - server time)
   *
   * This ensures countdown stays accurate even if client clock is wrong
   *
   * Cached per serverMs to avoid recalculation
   */
  const serverOffset = useMemo(() => {
    if (!serverMs) return 0;

    if (!serverOffsetCache.has(serverMs)) {
      serverOffsetCache.set(serverMs, Date.now() - serverMs);
    }

    return serverOffsetCache.get(serverMs);
  }, [serverMs]);

  /**
   * Calculates remaining seconds using corrected time
   * correctedNow = clientTime - offset (sync with server)
   */
  const getRemainingSeconds = (offset = serverOffset) => {
    const correctedNow = Date.now() - offset;
    return Math.max(0, Math.ceil((endMs - correctedNow) / 1000));
  };

  // State to store remaining seconds
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getRemainingSeconds()
  );

  useEffect(() => {
    // Immediately sync timer when RFQ changes
    const initial = getRemainingSeconds(serverOffset);
    setSecondsLeft(initial);

    // Reset API call flag for new RFQ
    hasCalled.current = false;

    // Clear any previous interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    // If already expired, do nothing
    if (initial <= 0) return;

    /**
     * Align timer to exact second boundary
     * This avoids drift (e.g., 1.2s, 0.8s inconsistencies)
     */
    const msRemaining     = endMs - (Date.now() - serverOffset);
    const msToNextSecond  = msRemaining % 1000 || 1000;

    // First align, then start interval
    const alignTimeout = setTimeout(() => {
      setSecondsLeft(getRemainingSeconds(serverOffset));

      intervalRef.current = setInterval(() => {
        const secs = getRemainingSeconds(serverOffset);
        setSecondsLeft(secs);

        // When timer reaches 0
        if (secs <= 0) {
          clearInterval(intervalRef.current);

          // Ensure API is called only once
          if (!hasCalled.current && apiFunction) {
            hasCalled.current = true;
            dispatch(apiFunction({ Data, navigate }));
          }
        }
      }, 1000);
    }, msToNextSecond);

    // Cleanup on unmount or dependency change
    return () => {
      clearTimeout(alignTimeout);
      clearInterval(intervalRef.current);
    };
  }, [rfqId, endMs, serverOffset]);

  // If timer finished, render nothing
  if (secondsLeft <= 0) return null;

  // Convert seconds into MM:SS format
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <span className="RFQ_TimerStyle">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
};