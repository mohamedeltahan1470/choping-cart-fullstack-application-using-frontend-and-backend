import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductId: localStorage.getItem("selectedProductId")
    ? JSON.parse(localStorage.getItem("selectedProductId"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productitem = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productitem);
      state.selectedProductId.push(action.payload.id);

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductId",
        JSON.stringify(state.selectedProductId)
      );
    },
    increaseQuantity: (state, action) => {
      const increasedproduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      increasedproduct.quantity += 1;

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
    decreaseQuantity: (state, action) => {
      const increasedproduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      increasedproduct.quantity -= 1;
      if (increasedproduct.quantity === 0) {
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        const newArr2 = state.selectedProductId.filter((item) => {
          return item !== action.payload.id;
        });
        state.selectedProducts = newArr;
        state.selectedProductId = newArr2;
        localStorage.setItem(
          "selectedProductId",
          JSON.stringify(state.selectedProductId)
        );
      }

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
    deleteProduct: (state, action) => {
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newArr2 = state.selectedProductId.filter((item) => {
        return item !== action.payload.id;
      });
      state.selectedProducts = newArr;
      state.selectedProductId = newArr2;
      localStorage.setItem(
        "selectedProductId",
        JSON.stringify(state.selectedProductId)
      );
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
