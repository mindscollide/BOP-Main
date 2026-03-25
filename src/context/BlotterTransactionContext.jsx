import {
  BlotterTransactionAccepted,
  BlotterTransactionAdded,
  BlotterTransactionAssigned,
  BlotterTransactionCancellationRequest,
  BlotterTransactionCancellationRequestForTreasury,
  BlotterTransactionRFQExpired,
  BlotterTransactionRFQQuoted,
  BlotterTransactionRejected,
  BlotterTranscationCancelled,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import React, {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const TransactionContext = createContext();

const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const TransactionProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Outstanding Deals
  const [hasBottomReachedOutstanding, setHasBottomReachedOutstanding] = useState(false);
  const [treasuryOutStandingDeal, setTreasuryOutStandingDeal]         = useState([]);
  const [treasuryOutStandingDealRecords, setTreasuryOutStandingDealRecords] = useState(0);
  const [treasuryOutStandingDealsRow, setTreasuryOutStandingDealsRow] = useState(0);

  // Treasury TXN Summary
  const [hasBottomReachedTreasuryTXN, setHasBottomReachedTreasuryTXN] = useState(false);
  const [treasuryTXNSummary, setTreasuryTXNSummary]                   = useState([]);
  const [treasuryTXNSummaryTotalRecords, setTreasuryTXNSummaryTotalRecords] = useState(0);
  const [treasuryTXNSummarysRow, setTreasuryTXNSummarysRow]           = useState(0);

  // ─── Selectors ───────────────────────────────────────────────────────────────
  const blotterTransactionRFQExpiredForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQExpiredForTreasury
  );
  const blotterTransactionAcceptedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAcceptedForTreasury
  );
  const blotterTransactionCancellationRequestDataForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionCancellationRequestDataForTreasury
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
  useLayoutEffect(() => {
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
      // ✅ All setState calls at top level — never nested
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
  useLayoutEffect(() => {
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
      // ✅ All setState calls at top level — never nested
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

  // ─── TXN Summary — MQTT updates ──────────────────────────────────────────────
  useLayoutEffect(() => {
    // ✅ Pure helper — returns new array only, no setState inside
    const applyUpdate = (prevData, transaction) => {
      const updated = [...(prevData || [])];
      const idx = updated.findIndex(
        (item) => item.pK_TransactionID === transaction.pK_TransactionID
      );
      if (idx !== -1) {
        updated[idx] = transaction;
        return { data: updated, countDelta: 0 }; // existing row updated
      }
      return { data: [transaction, ...updated], countDelta: 1 }; // new row prepended
    };

    if (blotterTransactionRFQExpiredForTreasury?.transaction) {
      const { data, countDelta } = applyUpdate(
        treasuryTXNSummary,
        blotterTransactionRFQExpiredForTreasury.transaction
      );
      setTreasuryTXNSummary(data);
      if (countDelta) {
        setTreasuryTXNSummarysRow((prev) => prev + 1);
        setTreasuryTXNSummaryTotalRecords((prev) => prev + 1);
      }
    }

    if (blotterTransactionAcceptedForTreasury?.transaction) {
      const { data, countDelta } = applyUpdate(
        treasuryTXNSummary,
        blotterTransactionAcceptedForTreasury.transaction
      );
      setTreasuryTXNSummary(data);
      if (countDelta) {
        setTreasuryTXNSummarysRow((prev) => prev + 1);
        setTreasuryTXNSummaryTotalRecords((prev) => prev + 1);
      }
    }

    if (blotterTranscationCancelledForTreasury?.transaction) {
      const { data, countDelta } = applyUpdate(
        treasuryTXNSummary,
        blotterTranscationCancelledForTreasury.transaction
      );
      setTreasuryTXNSummary(data);
      if (countDelta) {
        setTreasuryTXNSummarysRow((prev) => prev + 1);
        setTreasuryTXNSummaryTotalRecords((prev) => prev + 1);
      }
    }

    if (blotterTransactionRejectedForTreasury?.transaction) {
      const { data, countDelta } = applyUpdate(
        treasuryTXNSummary,
        blotterTransactionRejectedForTreasury.transaction
      );
      setTreasuryTXNSummary(data);
      if (countDelta) {
        setTreasuryTXNSummarysRow((prev) => prev + 1);
        setTreasuryTXNSummaryTotalRecords((prev) => prev + 1);
      }
    }

    if (blotterTransactionCancellationRequestDataForTreasury?.transaction) {
      const { transaction } = blotterTransactionCancellationRequestDataForTreasury;
      // ✅ Compute filtered array first, then call setState separately
      const filtered = (treasuryTXNSummary || []).filter(
        (item) => item.pK_TransactionID !== transaction.pK_TransactionID
      );
      setTreasuryTXNSummary(filtered);
      setTreasuryTXNSummaryTotalRecords((prev) => prev - 1);
      setTreasuryTXNSummarysRow((prev) => prev - 1);
      dispatch(BlotterTransactionCancellationRequestForTreasury(null));
    }
  }, [
    blotterTransactionRFQExpiredForTreasury,
    blotterTransactionAcceptedForTreasury,
    blotterTransactionCancellationRequestDataForTreasury,
    blotterTranscationCancelledForTreasury,
    blotterTransactionRejectedForTreasury,
  ]);

  // ─── Outstanding Deals — MQTT updates ────────────────────────────────────────
  useLayoutEffect(() => {
    try {
      if (blotterTransactionAdded?.transaction) {
        const transaction = blotterTransactionAdded.transaction;
        const current = treasuryOutStandingDeal || [];
        const idx = current.findIndex(
          (item) => item.pK_TransactionID === transaction.pK_TransactionID
        );

        if (idx !== -1) {
          // ✅ Update existing row — no count change
          const updated = [...current];
          updated[idx] = transaction;
          setTreasuryOutStandingDeal(updated);
        } else {
          // ✅ Prepend new row — update counts separately at top level
          setTreasuryOutStandingDeal([transaction, ...current]);
          setTreasuryOutStandingDealRecords((prev) => prev + 1);
          setTreasuryOutStandingDealsRow((prev) => prev + 1);
        }
        dispatch(BlotterTransactionAdded(null));
      }

      if (blotterTransactionRFQQuoted?.transaction) {
        const transaction = blotterTransactionRFQQuoted.transaction;
        setTreasuryOutStandingDeal((prev) =>
          (prev || []).map((item) =>
            item.pK_TransactionID === transaction.pK_TransactionID
              ? {
                  ...item,
                  bid: transaction.bid,
                  offer: transaction.offer,
                  amount: transaction.amount,
                  statusID: transaction.statusID,
                  rfqTimerDetails: transaction.rfqTimerDetails ?? item.rfqTimerDetails,
                }
              : item
          )
        );
        dispatch(BlotterTransactionRFQQuoted(null));
      }

      // ✅ Shared handler for remove-type events
      const removeTypes = [
        { data: blotterTransactionRFQExpired,    type: "expired",   action: BlotterTransactionRFQExpired },
        { data: blotterTransactionAccepted,      type: "accepted",  action: BlotterTransactionAccepted },
        { data: blotterTranscationCancelled,     type: "cancelled", action: BlotterTranscationCancelled },
        { data: blotterTransactionRejected,      type: "rejected",  action: BlotterTransactionRejected },
      ];

      removeTypes.forEach(({ data, action }) => {
        if (!data?.transaction) return;
        const { pK_TransactionID } = data.transaction;

        // ✅ Compute filtered array first — no setState inside setState
        const filtered = (treasuryOutStandingDeal || []).filter(
          (item) => item.pK_TransactionID !== pK_TransactionID
        );
        setTreasuryOutStandingDeal(filtered);
        setTreasuryOutStandingDealRecords((prev) => prev - 1);
        setTreasuryOutStandingDealsRow((prev) => prev - 1);
        dispatch(action(null));
      });

      if (blotterTransactionAssigned) {
        const transaction = blotterTransactionAssigned;
        setTreasuryOutStandingDeal((prev) =>
          (prev || []).map((item) =>
            item.pK_TransactionID === transaction.transactionID
              ? {
                  ...item,
                  status:
                    Number(localStorage.getItem("userID")) === Number(transaction.treasuryPersonID)
                      ? transaction.statusForAssignedUser
                      : transaction.statusForOtherTreasury,
                  statusID: transaction.statusID,
                  treasuryPersonID: transaction.treasuryPersonID,
                }
              : item
          )
        );
        dispatch(BlotterTransactionAssigned(null));
      }

      if (blotterTransactionCancellationRequest?.transaction) {
        const transaction = blotterTransactionCancellationRequest.transaction;
        const current = treasuryOutStandingDeal || [];
        const exists = current.some(
          (item) => item.pK_TransactionID === transaction.pK_TransactionID
        );

        if (!exists) {
          // ✅ Compute new array first, setState separately at top level
          setTreasuryOutStandingDeal([transaction, ...current]);
          setTreasuryOutStandingDealRecords((prev) => prev + 1);
          setTreasuryOutStandingDealsRow((prev) => prev + 1);
        }
        dispatch(BlotterTransactionCancellationRequest(null));
      }
    } catch (error) {
      console.error("Error in unified transaction handler:", error);
    }
  }, [
    blotterTransactionAdded,
    blotterTransactionRFQQuoted,
    blotterTransactionRFQExpired,
    blotterTransactionAccepted,
    blotterTranscationCancelled,
    blotterTransactionRejected,
    blotterTransactionAssigned,
    blotterTransactionCancellationRequest,
  ]);

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