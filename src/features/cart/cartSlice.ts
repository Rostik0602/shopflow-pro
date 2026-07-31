import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const expand = state.find((item) => item.id === action.payload);

      if (expand) {
        expand.quantity++;
      } else {
        state.push({
          id: action.payload,
          quantity: 1,
        });
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },

    increase: (state, action: PayloadAction<number>) => {
      const item = state.find((quant) => quant.id === action.payload);

      if (item) {
        item.quantity++;
      }
    },

    decrease: (state, action: PayloadAction<number>) => {
      const item = state.find((quant) => quant.id === action.payload);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        return state.filter((cartItem) => cartItem.id !== action.payload);
      }
    },

    clear: (state) => {
      return [];
    },
  },
});

export const { add, remove, increase, decrease, clear } = cartSlice.actions;
export default cartSlice.reducer;
