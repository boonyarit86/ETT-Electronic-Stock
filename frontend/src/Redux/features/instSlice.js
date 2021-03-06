// *** inst => insufficientTool ***
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insts: [],
};

const instSlice = createSlice({
  name: "insts",
  initialState,
  reducers: {
    setInsts: (state, action) => {
      state.insts = action.payload || [];
    },
    deleteInst: (state, action) => {
      state.insts = state.insts.filter((item) => item._id !== action.payload);
    },
}
});

// export const getTool = (state) => state.user.user;
export const {
  setInsts, deleteInst
} = instSlice.actions;
export default instSlice.reducer;