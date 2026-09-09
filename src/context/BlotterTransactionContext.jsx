import {
  BlotterTransactionAccepted,
  BlotterTransactionAcceptedForTreasury,
  BlotterTransactionAdded,
  BlotterTransactionAssigned,
  BlotterTransactionCancellationRequest,
  BlotterTransactionCancellationRequestForTreasury,
  BlotterTransactionRFQExpired,
  BlotterTransactionRFQQuoted,
  BlotterTransactionRejected,
  BlotterTransactionRejectedForTreasury,
  BlotterTranscationCancelled,
  BlotterTranscationCancelledForTreasury,
  setBlotterTransactionRFQExpiredForTreasury,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";

export const TransactionContext = createContext();

const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const TransactionProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Outstanding Deals
  const [hasBottomReachedOutstanding, setHasBottomReachedOutstanding] =
    useState(false);
  const [treasuryOutStandingDeal, setTreasuryOutStandingDeal] = useState([]);
  const [treasuryOutStandingDealRecords, setTreasuryOutStandingDealRecords] =
    useState(0);
  const [treasuryOutStandingDealsRow, setTreasuryOutStandingDealsRow] =
    useState(0);

  // Treasury TXN Summary
  const [hasBottomReachedTreasuryTXN, setHasBottomReachedTreasuryTXN] =
    useState(false);
  const [treasuryTXNSummary, setTreasuryTXNSummary] = useState([]);
  const [treasuryTXNSummaryTotalRecords, setTreasuryTXNSummaryTotalRecords] =
    useState(0);
  const [treasuryTXNSummarysRow, setTreasuryTXNSummarysRow] = useState(0);

  // ─── Selectors ───────────────────────────────────────────────────────────────
  const blotterTransactionRFQExpiredForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQExpiredForTreasury
  );
  const blotterTransactionAcceptedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAcceptedForTreasury
  );
  const blotterTransactionCancellationRequestDataForTreasury = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionCancellationRequestDataForTreasury
  );
  const blotterTranscationCancelledForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelledForTreasury
  );
  const blotterTransactionRejectedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejectedForTreasury
  );
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.BlotterSlicer.getBlotterApiData
  );
  const getBlotterOutstandingData = useSelector(
    (state) => state.BlotterSlicer.getBlotterOutstandingData
  );
  const blotterTransactionRFQExpired = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQExpired
  );
  const blotterTransactionAssigned = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAssigned
  );
  const blotterTransactionAdded = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAdded
  );
  const blotterTransactionRFQQuoted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQQuoted
  );
  const blotterTransactionAccepted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAccepted
  );
  const blotterTranscationCancelled = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelled
  );
  const blotterTransactionCancellationRequest = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionCancellationRequestData
  );
  const blotterTransactionRejected = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejected
  );

  // ─── TXN Summary — initial load ──────────────────────────────────────────────
  useEffect(() => {
    if (GlobalStateGetBlotterData === null) {
      if (!hasBottomReachedTreasuryTXN) {
        setTreasuryTXNSummary([]);
        setTreasuryTXNSummaryTotalRecords(0);
        setTreasuryTXNSummarysRow(0);
        setHasBottomReachedTreasuryTXN(false);
      }
      return;
    }

    const { tnxSummary, totalCount } = GlobalStateGetBlotterData;
    if (!isTreasury || !tnxSummary?.length) return;

    if (hasBottomReachedTreasuryTXN) {
      setTreasuryTXNSummary((prev) => [...prev, ...tnxSummary]);
      setTreasuryTXNSummaryTotalRecords(totalCount);
      setTreasuryTXNSummarysRow((prev) => prev + tnxSummary.length);
    } else {
      setTreasuryTXNSummary(tnxSummary);
      setTreasuryTXNSummaryTotalRecords(totalCount);
      setTreasuryTXNSummarysRow(tnxSummary.length);
    }
    setHasBottomReachedTreasuryTXN(false);
  }, [GlobalStateGetBlotterData]);

  // ─── Outstanding Deals — initial load ────────────────────────────────────────
  useEffect(() => {
    if (getBlotterOutstandingData === null) {
      if (!hasBottomReachedOutstanding) {
        setTreasuryOutStandingDeal([]);
        setTreasuryOutStandingDealRecords(0);
        setTreasuryOutStandingDealsRow(0);
        setHasBottomReachedOutstanding(false);
      }
      return;
    }

    const { outstandingDeals, totalCount } = getBlotterOutstandingData;
    if (!isTreasury || !outstandingDeals?.length) return;

    if (hasBottomReachedOutstanding) {
      setTreasuryOutStandingDeal((prev) => [...prev, ...outstandingDeals]);
      setTreasuryOutStandingDealRecords(totalCount);
      setTreasuryOutStandingDealsRow((prev) => prev + outstandingDeals.length);
    } else {
      setTreasuryOutStandingDeal(outstandingDeals);
      setTreasuryOutStandingDealRecords(totalCount);
      setTreasuryOutStandingDealsRow(outstandingDeals.length);
    }
    setHasBottomReachedOutstanding(false);
  }, [getBlotterOutstandingData]);

  // ─── Outstanding Deals — MQTT: TRANSACTION ADDED ─────────────────────────────
  useEffect(() => {
    if (!blotterTransactionAdded?.transaction) return;
    const transaction = blotterTransactionAdded.transaction;

    setTreasuryOutStandingDeal((prev) => {
      const idx = prev.findIndex(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = transaction;
        return updated;
      }
      return [transaction, ...prev];
    });
    setTreasuryOutStandingDealRecords((r) => r + 1);
    setTreasuryOutStandingDealsRow((r) => r + 1);

    dispatch(BlotterTransactionAdded(null));
  }, [blotterTransactionAdded]);

  // ─── Outstanding Deals — MQTT: RFQ QUOTED ────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionRFQQuoted?.transaction) return;
    const transaction = blotterTransactionRFQQuoted.transaction;

    setTreasuryOutStandingDeal((prev) =>
      prev.map((item) =>
        item.pK_TransactionID === transaction.pK_TransactionID
          ? {
              ...item,
              bid: transaction.bid,
              offer: transaction.offer,
              amount: transaction.amount,
              statusID: transaction.statusID,
              rfqTimerDetails:
                transaction.rfqTimerDetails ?? item.rfqTimerDetails,
            }
          : item
      )
    );

    dispatch(BlotterTransactionRFQQuoted(null));
  }, [blotterTransactionRFQQuoted]);

  // ─── Outstanding Deals — MQTT: RFQ EXPIRED ───────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionRFQExpired?.transaction) return;
    const { pK_TransactionID } = blotterTransactionRFQExpired.transaction;

    setTreasuryOutStandingDeal((prev) =>
      prev.filter((item) => item.pK_TransactionID !== pK_TransactionID)
    );
    setTreasuryOutStandingDealRecords((r) => r - 1);
    setTreasuryOutStandingDealsRow((r) => r - 1);

    dispatch(BlotterTransactionRFQExpired(null));
  }, [blotterTransactionRFQExpired]);

  // ─── Outstanding Deals — MQTT: ACCEPTED ──────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionAccepted?.transaction) return;
    const { pK_TransactionID } = blotterTransactionAccepted.transaction;

    setTreasuryOutStandingDeal((prev) =>
      prev.filter((item) => item.pK_TransactionID !== pK_TransactionID)
    );
    setTreasuryOutStandingDealRecords((r) => r - 1);
    setTreasuryOutStandingDealsRow((r) => r - 1);

    dispatch(BlotterTransactionAccepted(null));
  }, [blotterTransactionAccepted]);

  // ─── Outstanding Deals — MQTT: CANCELLED ─────────────────────────────────────
  useEffect(() => {
    if (!blotterTranscationCancelled?.transaction) return;
    const { pK_TransactionID } = blotterTranscationCancelled.transaction;

    setTreasuryOutStandingDeal((prev) =>
      prev.filter((item) => item.pK_TransactionID !== pK_TransactionID)
    );
    setTreasuryOutStandingDealRecords((r) => r - 1);
    setTreasuryOutStandingDealsRow((r) => r - 1);

    dispatch(BlotterTranscationCancelled(null));
  }, [blotterTranscationCancelled]);

  // ─── Outstanding Deals — MQTT: REJECTED ──────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionRejected?.transaction) return;
    const { pK_TransactionID } = blotterTransactionRejected.transaction;

    setTreasuryOutStandingDeal((prev) =>
      prev.filter((item) => item.pK_TransactionID !== pK_TransactionID)
    );
    setTreasuryOutStandingDealRecords((r) => r - 1);
    setTreasuryOutStandingDealsRow((r) => r - 1);

    dispatch(BlotterTransactionRejected(null));
  }, [blotterTransactionRejected]);

  // ─── Outstanding Deals — MQTT: ASSIGNED ──────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionAssigned) return;
    const transaction = blotterTransactionAssigned;

    setTreasuryOutStandingDeal((prev) =>
      prev.map((item) =>
        item.pK_TransactionID === transaction.transactionID
          ? {
              ...item,
              status:
                Number(localStorage.getItem("userID")) ===
                Number(transaction.treasuryPersonID)
                  ? transaction.statusForAssignedUser
                  : transaction.statusForOtherTreasury,
              statusID: transaction.statusID,
              treasuryPersonID: transaction.treasuryPersonID,
            }
          : item
      )
    );

    dispatch(BlotterTransactionAssigned(null));
  }, [blotterTransactionAssigned]);

  // ─── Outstanding Deals — MQTT: CANCELLATION REQUEST ──────────────────────────
  useEffect(() => {
    if (!blotterTransactionCancellationRequest?.transaction) return;
    const transaction = blotterTransactionCancellationRequest.transaction;

    setTreasuryOutStandingDeal((prev) => {
      const exists = prev.some(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (exists) return prev;
      return [transaction, ...prev];
    });
    setTreasuryOutStandingDealRecords((r) => r + 1);
    setTreasuryOutStandingDealsRow((r) => r + 1);

    dispatch(BlotterTransactionCancellationRequest(null));
  }, [blotterTransactionCancellationRequest]);

  // ─── TXN Summary — MQTT: RFQ EXPIRED ─────────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionRFQExpiredForTreasury?.transaction) return;
    const transaction = blotterTransactionRFQExpiredForTreasury.transaction;

    setTreasuryTXNSummary((prev) => {
      const idx = prev.findIndex(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = transaction;
        return updated;
      }
      return [transaction, ...prev];
    });
    setTreasuryTXNSummarysRow((r) => r + 1);
    setTreasuryTXNSummaryTotalRecords((r) => r + 1);

    dispatch(setBlotterTransactionRFQExpiredForTreasury(null));
  }, [blotterTransactionRFQExpiredForTreasury]);

  // ─── TXN Summary — MQTT: ACCEPTED ────────────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionAcceptedForTreasury?.transaction) return;
    const transaction = blotterTransactionAcceptedForTreasury.transaction;

    setTreasuryTXNSummary((prev) => {
      const idx = prev.findIndex(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = transaction;
        return updated;
      }
      return [transaction, ...prev];
    });
    setTreasuryTXNSummarysRow((r) => r + 1);
    setTreasuryTXNSummaryTotalRecords((r) => r + 1);

    dispatch(BlotterTransactionAcceptedForTreasury(null));
  }, [blotterTransactionAcceptedForTreasury]);

  // ─── TXN Summary — MQTT: CANCELLED ───────────────────────────────────────────
  useEffect(() => {
    if (!blotterTranscationCancelledForTreasury?.transaction) return;
    const transaction = blotterTranscationCancelledForTreasury.transaction;

    setTreasuryTXNSummary((prev) => {
      const idx = prev.findIndex(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = transaction;
        return updated;
      }
      return [transaction, ...prev];
    });
    setTreasuryTXNSummarysRow((r) => r + 1);
    setTreasuryTXNSummaryTotalRecords((r) => r + 1);

    dispatch(BlotterTranscationCancelledForTreasury(null));
  }, [blotterTranscationCancelledForTreasury]);

  // ─── TXN Summary — MQTT: REJECTED ────────────────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionRejectedForTreasury?.transaction) return;
    const transaction = blotterTransactionRejectedForTreasury.transaction;

    setTreasuryTXNSummary((prev) => {
      const idx = prev.findIndex(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = transaction;
        return updated;
      }
      return [transaction, ...prev];
    });
    setTreasuryTXNSummarysRow((r) => r + 1);
    setTreasuryTXNSummaryTotalRecords((r) => r + 1);

    dispatch(BlotterTransactionRejectedForTreasury(null));
  }, [blotterTransactionRejectedForTreasury]);

  // ─── TXN Summary — MQTT: CANCELLATION REQUEST ────────────────────────────────
  useEffect(() => {
    if (!blotterTransactionCancellationRequestDataForTreasury?.transaction) return;
    const { pK_TransactionID } =
      blotterTransactionCancellationRequestDataForTreasury.transaction;

    setTreasuryTXNSummary((prev) =>
      prev.filter((item) => item.pK_TransactionID !== pK_TransactionID)
    );
    setTreasuryTXNSummaryTotalRecords((r) => r - 1);
    setTreasuryTXNSummarysRow((r) => r - 1);

    dispatch(BlotterTransactionCancellationRequestForTreasury(null));
  }, [blotterTransactionCancellationRequestDataForTreasury]);

  return (
    <TransactionContext.Provider
      value={{
        hasBottomReachedOutstanding,
        setHasBottomReachedOutstanding,
        treasuryOutStandingDeal,
        setTreasuryOutStandingDeal,
        treasuryOutStandingDealRecords,
        setTreasuryOutStandingDealRecords,
        treasuryOutStandingDealsRow,
        setTreasuryOutStandingDealsRow,
        hasBottomReachedTreasuryTXN,
        setHasBottomReachedTreasuryTXN,
        treasuryTXNSummary,
        setTreasuryTXNSummary,
        treasuryTXNSummaryTotalRecords,
        setTreasuryTXNSummaryTotalRecords,
        treasuryTXNSummarysRow,
        setTreasuryTXNSummarysRow,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useBlotterTransaction = () => useContext(TransactionContext);
export default TransactionProvider;
