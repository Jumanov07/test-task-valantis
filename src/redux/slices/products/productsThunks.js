import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../configs/axiosInstance";

const getProductsIds = createAsyncThunk(
  "products/getProductsIds",
  async ({ offset, limit }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/", {
        action: "get_ids",
        params: { offset, limit },
      });

      dispatch(getProducts(response.data.result));

      return response.data.result;
    } catch (error) {
      rejectWithValue(error);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return dispatch(getProductsIds({ offset, limit }));
    }
  }
);

const getProducts = createAsyncThunk(
  "products/getProducts",
  async (ids, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/", {
        action: "get_items",
        params: { ids },
      });

      return response.data.result;
    } catch (error) {
      rejectWithValue(error);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return dispatch(getProducts(ids));
    }
  }
);

const getFieldValues = createAsyncThunk(
  "products/getFieldValues",
  async ({ field, offset, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/", {
        action: "get_fields",
        params: { field, offset, limit },
      });

      return { data: response.data.result };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const filterProductsByName = createAsyncThunk(
  "products/filterProductsByName",
  async (name, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/", {
        action: "filter",
        params: { product: name },
      });

      dispatch(getProducts(response.data.result));

      return response.data.result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const filterProductsByPrice = createAsyncThunk(
  "products/filterProductsByPrice",
  async ({ debouncedPrice, params }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/", {
        action: "filter",
        params: { price: +debouncedPrice },
      });

      if (response.data.result.length > 0) {
        console.log("worked");

        dispatch(getProducts(response.data.result));
      } else {
        dispatch(getProductsIds(params));
      }

      return response.data.result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const filterProductsByBrand = createAsyncThunk(
  "products/filterProductsByBrand",
  async ({ value, params }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/", {
        action: "filter",
        params: { brand: value },
      });

      if (response.data.result.length > 0) {
        console.log("worked");

        dispatch(getProducts(response.data.result));
      } else {
        dispatch(getProductsIds(params));
      }

      return response.data.result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const PRODUCTS_THUNKS = {
  getProducts,
  getProductsIds,
  getFieldValues,
  filterProductsByName,
  filterProductsByPrice,
  filterProductsByBrand,
};
