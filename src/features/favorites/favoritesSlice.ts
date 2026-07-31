import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const expand = state.find((id) => id === action.payload);

      if (!expand) {
        state.push(action.payload);
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      return state.filter((id) => id !== action.payload);
    },
  },
});

export const { add, remove } = favoriteSlice.actions;
export default favoriteSlice.reducer;
