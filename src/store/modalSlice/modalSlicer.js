// redux/slices/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTenorModal: false,
  iSellAndBuyModal: false,
  settingModal: false,
  chatModal: false,
  dealModalRequest: false,
  viewDealModal: false,
  chatModalTransactionId: "",
  treasuryPersonID: 0,
  settingsRecord: {
    BD_Enable2FA: false,
    BD_SoundOnEveryMessage: false,
    BD_EmailOnEveryMessage: false,
  },
  transactionInfoModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCreateTenorModal(state, action) {
      state.createTenorModal = action.payload;
    },
    setISellAndBuyModal(state, action) {
      state.iSellAndBuyModal = action.payload;
    },
    setSettingModal(state, action) {
      state.settingModal = action.payload;
    },
    setChatModal(state, action) {
      state.chatModal = action.payload;
    },
    setChatModalTransactionId(state, action) {
      state.chatModalTransactionId = action.payload;
    },
    setSettingRecords: (state, action) => {
      state.settingsRecord = {
        ...state.settingsRecord,
        ...action.payload,
      };
    },

    setTransactionInfoModal(state, action) {
      state.transactionInfoModal = action.payload;
    },
    setDealModalRequest(state, { payload }) {
      state.dealModalRequest = payload;
    },
    setViewDealModal(state, { payload }) {
      state.viewDealModal = payload;
    },
    setTreasuryPersonID(state, { payload }) {
      state.treasuryPersonID = payload;
    },
    resetModalState() {
      return initialState;
    },
  },
});

export const {
  setTreasuryPersonID,
  setDealModalRequest,
  setViewDealModal,
  setCreateTenorModal,
  setISellAndBuyModal,
  setSettingModal,
  setChatModal,
  setChatModalTransactionId,
  setSettingRecords,
  setTransactionInfoModal,
  resetModalState,
} = modalSlice.actions;

export default modalSlice.reducer;
