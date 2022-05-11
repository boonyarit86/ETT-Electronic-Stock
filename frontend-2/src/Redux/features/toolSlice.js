import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tools: [],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTools: (state, action) => {
      state.tools = action.payload;
    },
    actionTool: (state, action) => {
      let { tid, total } = action.payload;
      state.tools.find((tool) => {
        if(tool._id === tid) {
          tool.total = total
        }
        return tool
      })
    }
  }
});

// export const getTools = (state) => state.user.user;
export const { setTools, actionTool } = toolsSlice.actions;
export default toolsSlice.reducer;
