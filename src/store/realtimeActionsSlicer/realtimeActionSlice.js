import { createSlice } from "@reduxjs/toolkit";

const RealtimeActionsSlice = createSlice({
  name: "realtimeActions",
  initialState: {
    marketTimingsUpdated: null,
    marketStatus: null,
    IncomingChat: [],
    tenorsCreated: null,
    currentRatesPublished: null,
    FeDiscountingPublished: null,
    tenorWiseForwardsRates: null,
    NonFeDiscountingPublished: null,
    categoryisAdded: null,
    categoryisUpdated: null,
    categoryisDeleted: null,
    BlotterTransactionRFQExpired: null,
    BlotterTransactionAdded: null,
    BlotterTransactionAssigned: null,
    BlotterTransactionAccepted: null
  },
  reducers: {
    setMarketTimingsUpdated(state, { payload }) {
      state.marketTimingsUpdated = payload;
    },
    setIncomingChat(state, { payload }) {
      state.IncomingChat = [...state.IncomingChat, payload];
    },
    setTenorsCreated(state, { payload }) {
      state.tenorsCreated = payload;
    },
    currentRatePublishedAction(state, { payload }) {
      state.currentRatesPublished = payload;
    },
    FeDiscountingPublishedAction(state, { payload }) {
      state.FeDiscountingPublished = payload;
    },
    tenorWiseFowardsRatesPublishedActions(state, { payload }) {
      state.tenorWiseForwardsRates = payload;
    },
    NonFeDiscountingPublishedAction(state, { payload }) {
      state.NonFeDiscountingPublished = payload;
    },
    marketStatusUpdated(state, { payload }) {
      state.marketStatus = payload;
    },
    categoryisAdded(state, { payload }) {
      state.categoryisAdded = payload;
    },
    categoryisUpdated(state, { payload }) {
      state.categoryisUpdated = payload;
    },
    categoryisDeleted(state, { payload }) {
      state.categoryisDeleted = payload;
    },
    BlotterTransactionRFQExpired(state, { payload }) {
      state.BlotterTransactionRFQExpired = payload;
    },
    BlotterTransactionAdded(state, { payload }) {
      state.BlotterTransactionAdded = payload;
    },
    BlotterTransactionAssigned(state, { payload }) {
      state.BlotterTransactionAssigned = payload;
    },
    BlotterTransactionAccepted(state, { payload }) {
      state.BlotterTransactionAccepted = payload;
    }
  },
});

export const {
  BlotterTransactionAccepted,
  BlotterTransactionAssigned,
  BlotterTransactionAdded,
  categoryisAdded,
  categoryisUpdated,
  categoryisDeleted,
  setIncomingChat,
  setMarketTimingsUpdated,
  setTenorsCreated,
  currentRatePublishedAction,
  FeDiscountingPublishedAction,
  tenorWiseFowardsRatesPublishedActions,
  NonFeDiscountingPublishedAction,
  marketStatusUpdated,
  BlotterTransactionRFQExpired
} = RealtimeActionsSlice.actions;

export default RealtimeActionsSlice.reducer;
