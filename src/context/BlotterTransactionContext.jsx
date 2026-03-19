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

  // This is Treasury Actions which is based on actions performed on Blotter Transaction
  const blotterTransactionRFQExpiredForTreasury = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionRFQExpiredForTreasury
  );
  const blotterTransactionAcceptedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAcceptedForTreasury
  );
  const blotterTransactionCancellationRequestDataForTreasury = useSelector(
    (state) =>
      state.RealtimeActionsSlice
        .BlotterTransactionCancellationRequestDataForTreasury
  );
  const blotterTranscationCancelledForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelledForTreasury
  );
  const blotterTransactionRejectedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejectedForTreasury
  );
  // Treasury and CounterParty Data
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.BlotterSlicer.getBlotterApiData
  );

  //Global State For Blotter OutStanding
  const getBlotterOutstandingData = useSelector(
    (state) => state.BlotterSlicer.getBlotterOutstandingData
  );
  // This is mqtt states related to Treasury Outstanding Deals Tab

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
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionCancellationRequestData
  );

  const blotterTransactionRejected = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejected
  );

  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    try {
      if (GlobalStateGetBlotterData !== null) {
        const { tnxSummary, totalCount } = GlobalStateGetBlotterData;
        if (tnxSummary.length > 0) {
          if (isTreasury) {
            if (hasBottomReachedTreasuryTXN) {
              setTreasuryTXNSummary((prev) => [...prev, ...tnxSummary]);
              setTreasuryTXNSummaryTotalRecords(totalCount);
              setTreasuryTXNSummarysRow((prev) => prev + tnxSummary.length);
              setHasBottomReachedTreasuryTXN(false);
            } else {
              setTreasuryTXNSummary(tnxSummary);
              setTreasuryTXNSummaryTotalRecords(totalCount);
              setTreasuryTXNSummarysRow(tnxSummary.length);
              setHasBottomReachedTreasuryTXN(false);
            }
            return;
          }
        }
      } else if (GlobalStateGetBlotterData === null) {
        if (!hasBottomReachedTreasuryTXN) {
          setTreasuryTXNSummary([]);
          setTreasuryTXNSummaryTotalRecords(0);
          setTreasuryTXNSummarysRow(0);
          setHasBottomReachedTreasuryTXN(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [GlobalStateGetBlotterData]);

  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    try {
      if (getBlotterOutstandingData !== null) {
        const { outstandingDeals, totalCount } = getBlotterOutstandingData;
        if (outstandingDeals.length > 0) {
          if (isTreasury) {
            if (hasBottomReachedOutstanding) {
              setHasBottomReachedOutstanding(false);
              setTreasuryOutStandingDeal((prev) => [
                ...prev,
                ...outstandingDeals,
              ]);
              setTreasuryOutStandingDealRecords(totalCount);
              setTreasuryOutStandingDealsRow(
                (prev) => prev + outstandingDeals.length
              );
              return;
            } else {
              setHasBottomReachedOutstanding(false);
              setTreasuryOutStandingDeal(outstandingDeals);
              setTreasuryOutStandingDealRecords(totalCount);
              setTreasuryOutStandingDealsRow(outstandingDeals.length);
              return;
            }
          }
        }
      } else if (getBlotterOutstandingData === null) {
        if (!hasBottomReachedOutstanding) {
          setHasBottomReachedOutstanding(false);
          setTreasuryOutStandingDeal([]);
          setTreasuryOutStandingDealRecords(0);
          setTreasuryOutStandingDealsRow(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [getBlotterOutstandingData]);

  // This useEffect is for Treasury TXN Summary
  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    const handleTransactionUpdate = (transaction) => {
      if (!transaction) return;

      setTreasuryTXNSummary((prevData) => {
        const updatedData = [...(prevData || [])];
        const existingIndex = updatedData.findIndex(
          (item) => item.pK_TransactionID === transaction.pK_TransactionID
        );

        if (existingIndex !== -1) {
          updatedData[existingIndex] = transaction;
        } else {
          updatedData.unshift(transaction);
          setTreasuryTXNSummarysRow((prev) => prev + 1);
          setTreasuryTXNSummaryTotalRecords((prev) => prev + 1);
        }

        return updatedData;
      });
    };

    // Handle RFQ Expired
    if (blotterTransactionRFQExpiredForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTransactionRFQExpiredForTreasury.transaction
      );
    }

    // Handle Transaction Accepted
    if (blotterTransactionAcceptedForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTransactionAcceptedForTreasury.transaction
      );
    }

    // Handle Transaction Cancelled
    if (blotterTranscationCancelledForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTranscationCancelledForTreasury.transaction
      );
    }

    // Handle Transaction Rejected
    if (blotterTransactionRejectedForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTransactionRejectedForTreasury.transaction
      );
    }

    // Handle Transaction Cancellation Request
    if (blotterTransactionCancellationRequestDataForTreasury?.transaction) {
      const { transaction } =
        blotterTransactionCancellationRequestDataForTreasury;

      setTreasuryTXNSummary((prevData) => {
        const updatedData = (prevData || []).filter(
          (item) => item.pK_TransactionID !== transaction.pK_TransactionID
        );
        setTreasuryTXNSummaryTotalRecords((prev) => prev - 1);
        setTreasuryTXNSummarysRow((prev) => prev - 1);

        return updatedData;
      });

      dispatch(BlotterTransactionCancellationRequestForTreasury(null));
    }
  }, [
    blotterTransactionRFQExpiredForTreasury,
    blotterTransactionAcceptedForTreasury,
    blotterTransactionCancellationRequestDataForTreasury,
    blotterTranscationCancelledForTreasury,
    blotterTransactionRejectedForTreasury,
  ]);

  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    const handleTransaction = (transaction, type) => {
      if (!transaction) return;

      setTreasuryOutStandingDeal((prevData) => {
        let updatedData = [...(prevData || [])];

        switch (type) {
          case "added": {
            const index = updatedData.findIndex(
              (item) => item.pK_TransactionID === transaction.pK_TransactionID
            );

            if (index !== -1) {
              updatedData[index] = transaction;
            } else {
              updatedData = [transaction, ...updatedData];
              setTreasuryOutStandingDealRecords((prev) => prev + 1);
              setTreasuryOutStandingDealsRow((prev) => prev + 1);
            }

            dispatch(BlotterTransactionAdded(null));
            return updatedData;
          }

          case "quoted": {
            updatedData = updatedData.map((item) =>
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
            );

            dispatch(BlotterTransactionRFQQuoted(null));
            return updatedData;
          }

          case "expired":
          case "accepted":
          case "cancelled":
          case "rejected": {
            updatedData = updatedData.filter(
              (item) => item.pK_TransactionID !== transaction.pK_TransactionID
            );

            const dispatchMap = {
              expired: BlotterTransactionRFQExpired,
              accepted: BlotterTransactionAccepted,
              cancelled: BlotterTranscationCancelled,
              rejected: BlotterTransactionRejected,
            };
            setTreasuryOutStandingDealRecords((prev) => prev - 1);
            setTreasuryOutStandingDealsRow((prev) => prev - 1);

            dispatch(dispatchMap[type](null));
            return updatedData;
          }

          case "assigned": {
            updatedData = updatedData.map((item) =>
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
            );
            dispatch(BlotterTransactionAssigned(null));
            return updatedData;
          }

          case "cancellationRequest": {
            const exists = updatedData.find(
              (item) => item.pK_TransactionID === transaction.pK_TransactionID
            );

            if (!exists) {
              updatedData = [transaction, ...updatedData];
              setTreasuryOutStandingDealRecords((prev) => prev + 1);
              setTreasuryOutStandingDealsRow((prev) => prev + 1);
            }

            dispatch(BlotterTransactionCancellationRequest(null));
            return updatedData;
          }

          default:
            return updatedData;
        }
      });
    };

    try {
      if (blotterTransactionAdded?.transaction) {
        handleTransaction(blotterTransactionAdded.transaction, "added");
      }

      if (blotterTransactionRFQQuoted?.transaction) {
        handleTransaction(blotterTransactionRFQQuoted.transaction, "quoted");
      }

      if (blotterTransactionRFQExpired?.transaction) {
        handleTransaction(blotterTransactionRFQExpired.transaction, "expired");
      }

      if (blotterTransactionAccepted?.transaction) {
        handleTransaction(blotterTransactionAccepted.transaction, "accepted");
      }

      if (blotterTranscationCancelled?.transaction) {
        handleTransaction(blotterTranscationCancelled.transaction, "cancelled");
      }

      if (blotterTransactionRejected?.transaction) {
        handleTransaction(blotterTransactionRejected.transaction, "rejected");
      }

      if (blotterTransactionAssigned) {
        handleTransaction(blotterTransactionAssigned, "assigned");
      }

      if (blotterTransactionCancellationRequest?.transaction) {
        handleTransaction(
          blotterTransactionCancellationRequest.transaction,
          "cancellationRequest"
        );
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
        // Outstanding Deals
        hasBottomReachedOutstanding,
        setHasBottomReachedOutstanding,
        treasuryOutStandingDeal,
        setTreasuryOutStandingDeal,
        treasuryOutStandingDealRecords,
        setTreasuryOutStandingDealRecords,
        treasuryOutStandingDealsRow,
        setTreasuryOutStandingDealsRow,

        // Treasury TXN Summary
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
