// contexts/TransactionContext.jsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const TransactionContext = createContext();

// Action types
const ACTION_TYPES = {
  SET_TXN_SUMMARY: 'SET_TXN_SUMMARY',
  SET_OUTSTANDING_DEALS: 'SET_OUTSTANDING_DEALS',
  UPDATE_TXN_SUMMARY: 'UPDATE_TXN_SUMMARY',
  UPDATE_OUTSTANDING_DEALS: 'UPDATE_OUTSTANDING_DEALS',
  ADD_TXN_SUMMARY: 'ADD_TXN_SUMMARY',
  ADD_OUTSTANDING_DEALS: 'ADD_OUTSTANDING_DEALS',
  REMOVE_TXN_SUMMARY: 'REMOVE_TXN_SUMMARY',
  REMOVE_OUTSTANDING_DEALS: 'REMOVE_OUTSTANDING_DEALS',
  SET_LOADING: 'SET_LOADING',
  SET_HAS_BOTTOM_REACHED: 'SET_HAS_BOTTOM_REACHED',
  RESET: 'RESET'
};

// Reducer function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TXN_SUMMARY:
      return {
        ...state,
        treasuryTXNSummary: action.payload.data,
        treasuryTXNSummaryTotalRecords: action.payload.totalCount,
        treasuryTXNSummarysRow: action.payload.data.length
      };

    case ACTION_TYPES.SET_OUTSTANDING_DEALS:
      return {
        ...state,
        treasuryOutStandingDeal: action.payload.data,
        treasuryOutStandingDealRecords: action.payload.totalCount,
        treasuryOutStandingDealsRow: action.payload.data.length
      };

    case ACTION_TYPES.UPDATE_TXN_SUMMARY:
      return {
        ...state,
        treasuryTXNSummary: state.treasuryTXNSummary.map(item =>
          item.pK_TransactionID === action.payload.pK_TransactionID
            ? { ...item, ...action.payload }
            : item
        )
      };

    case ACTION_TYPES.ADD_TXN_SUMMARY:
      return {
        ...state,
        treasuryTXNSummary: [action.payload, ...state.treasuryTXNSummary],
        treasuryTXNSummaryTotalRecords: state.treasuryTXNSummaryTotalRecords + 1,
        treasuryTXNSummarysRow: state.treasuryTXNSummarysRow + 1
      };

    case ACTION_TYPES.REMOVE_TXN_SUMMARY:
      const filteredTxnSummary = state.treasuryTXNSummary.filter(
        item => item.pK_TransactionID !== action.payload
      );
      return {
        ...state,
        treasuryTXNSummary: filteredTxnSummary,
        treasuryTXNSummaryTotalRecords: state.treasuryTXNSummaryTotalRecords - 1,
        treasuryTXNSummarysRow: state.treasuryTXNSummarysRow - 1
      };

    case ACTION_TYPES.UPDATE_OUTSTANDING_DEALS:
      return {
        ...state,
        treasuryOutStandingDeal: state.treasuryOutStandingDeal.map(item =>
          item.pK_TransactionID === action.payload.pK_TransactionID
            ? { ...item, ...action.payload }
            : item
        )
      };

    case ACTION_TYPES.ADD_OUTSTANDING_DEALS:
      return {
        ...state,
        treasuryOutStandingDeal: [action.payload, ...state.treasuryOutStandingDeal],
        treasuryOutStandingDealRecords: state.treasuryOutStandingDealRecords + 1,
        treasuryOutStandingDealsRow: state.treasuryOutStandingDealsRow + 1
      };

    case ACTION_TYPES.REMOVE_OUTSTANDING_DEALS:
      const filteredOutstanding = state.treasuryOutStandingDeal.filter(
        item => item.pK_TransactionID !== action.payload
      );
      return {
        ...state,
        treasuryOutStandingDeal: filteredOutstanding,
        treasuryOutStandingDealRecords: state.treasuryOutStandingDealRecords - 1,
        treasuryOutStandingDealsRow: state.treasuryOutStandingDealsRow - 1
      };

    case ACTION_TYPES.SET_HAS_BOTTOM_REACHED:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

const initialState = {
  treasuryTXNSummary: [],
  treasuryTXNSummaryTotalRecords: 0,
  treasuryTXNSummarysRow: 0,
  treasuryOutStandingDeal: [],
  treasuryOutStandingDealRecords: 0,
  treasuryOutStandingDealsRow: 0,
  hasBottomReachedTreasuryTXN: false,
  hasBottomReachedOutstanding: false,
  loading: false
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const reduxDispatch = useDispatch();

  // Action creators
  const setTxnSummary = useCallback((data, totalCount) => {
    dispatch({
      type: ACTION_TYPES.SET_TXN_SUMMARY,
      payload: { data, totalCount }
    });
  }, []);

  const setOutstandingDeals = useCallback((data, totalCount) => {
    dispatch({
      type: ACTION_TYPES.SET_OUTSTANDING_DEALS,
      payload: { data, totalCount }
    });
  }, []);

  const updateTxnSummary = useCallback((transaction) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TXN_SUMMARY,
      payload: transaction
    });
  }, []);

  const addTxnSummary = useCallback((transaction) => {
    dispatch({
      type: ACTION_TYPES.ADD_TXN_SUMMARY,
      payload: transaction
    });
  }, []);

  const removeTxnSummary = useCallback((transactionId) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_TXN_SUMMARY,
      payload: transactionId
    });
  }, []);

  const updateOutstandingDeals = useCallback((transaction) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_OUTSTANDING_DEALS,
      payload: transaction
    });
  }, []);

  const addOutstandingDeals = useCallback((transaction) => {
    dispatch({
      type: ACTION_TYPES.ADD_OUTSTANDING_DEALS,
      payload: transaction
    });
  }, []);

  const removeOutstandingDeals = useCallback((transactionId) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_OUTSTANDING_DEALS,
      payload: transactionId
    });
  }, []);

  const setHasBottomReached = useCallback((key, value) => {
    dispatch({
      type: ACTION_TYPES.SET_HAS_BOTTOM_REACHED,
      payload: { key, value }
    });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({
      type: ACTION_TYPES.SET_LOADING,
      payload: loading
    });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTION_TYPES.RESET });
  }, []);

  // Handler functions for different transaction types
  const handleTxnSummaryUpdate = useCallback((transaction) => {
    if (!transaction) return;

    const existingIndex = state.treasuryTXNSummary.findIndex(
      item => item.pK_TransactionID === transaction.pK_TransactionID
    );

    if (existingIndex !== -1) {
      updateTxnSummary(transaction);
    } else {
      addTxnSummary(transaction);
    }
  }, [state.treasuryTXNSummary, updateTxnSummary, addTxnSummary]);

  const handleOutstandingDealsUpdate = useCallback((transaction, type) => {
    if (!transaction) return;

    switch (type) {
      case 'added':
        const existingIndex = state.treasuryOutStandingDeal.findIndex(
          item => item.pK_TransactionID === transaction.pK_TransactionID
        );

        if (existingIndex !== -1) {
          updateOutstandingDeals(transaction);
        } else {
          addOutstandingDeals(transaction);
        }
        break;

      case 'quoted':
        updateOutstandingDeals({
          ...transaction,
          bid: transaction.bid,
          offer: transaction.offer,
          amount: transaction.amount,
          statusID: transaction.statusID,
          rfqTimerDetails: transaction.rfqTimerDetails
        });
        break;

      case 'expired':
      case 'accepted':
      case 'cancelled':
      case 'rejected':
        removeOutstandingDeals(transaction.pK_TransactionID);
        break;

      case 'assigned':
        updateOutstandingDeals({
          ...transaction,
          status: Number(localStorage.getItem('userID')) === Number(transaction.treasuryPersonID)
            ? transaction.statusForAssignedUser
            : transaction.statusForOtherTreasury,
          statusID: transaction.statusID,
          treasuryPersonID: transaction.treasuryPersonID
        });
        break;

      case 'cancellationRequest':
        const exists = state.treasuryOutStandingDeal.find(
          item => item.pK_TransactionID === transaction.pK_TransactionID
        );

        if (!exists) {
          addOutstandingDeals(transaction);
        }
        break;

      default:
        break;
    }
  }, [state.treasuryOutStandingDeal, updateOutstandingDeals, addOutstandingDeals, removeOutstandingDeals]);

  const value = {
    ...state,
    setTxnSummary,
    setOutstandingDeals,
    updateTxnSummary,
    addTxnSummary,
    removeTxnSummary,
    updateOutstandingDeals,
    addOutstandingDeals,
    removeOutstandingDeals,
    setHasBottomReached,
    setLoading,
    reset,
    handleTxnSummaryUpdate,
    handleOutstandingDealsUpdate
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};