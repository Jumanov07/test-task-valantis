import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_THUNKS } from "./productsThunks";

const initialState = {
  productList: [],
  isLoading: false,
  currentPage: 1,
  brands: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(PRODUCTS_THUNKS.getProductsIds.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.getProductsIds.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(PRODUCTS_THUNKS.getProductsIds.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.getProducts.fulfilled, (state, { payload }) => {
        const uniqueProducts = Array.from(
          new Set(payload.slice(0, 50).map((product) => product.id))
        ).map((id) => payload.find((product) => product.id === id));

        state.productList = uniqueProducts;

        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.getProducts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(PRODUCTS_THUNKS.getProducts.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(
        PRODUCTS_THUNKS.getFieldValues.fulfilled,
        (state, { payload }) => {
          state.brands = payload.data.filter(
            (option) => option != null && option !== ""
          );

          state.isLoading = false;
        }
      )

      .addCase(PRODUCTS_THUNKS.getFieldValues.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(PRODUCTS_THUNKS.getFieldValues.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByBrand.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByBrand.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByBrand.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByName.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByName.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByName.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByPrice.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByPrice.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(PRODUCTS_THUNKS.filterProductsByPrice.rejected, (state) => {
        state.isLoading = false;
      }),
});

const PRODUCTS_ACTIONS = productsSlice.actions;

export { productsSlice, PRODUCTS_ACTIONS };
