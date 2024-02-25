/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_THUNKS } from "../redux/slices/products/productsThunks";
import ProductItem from "./ProductItem";
import { PRODUCTS_ACTIONS } from "../redux/slices/products/productsSlice";
import ProductFilter from "./ProductFilter";

const ProductList = () => {
  const { productList, isLoading, currentPage } = useSelector(
    (state) => state.products
  );

  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState({ offset: 0, limit: 50 });

  const dispatch = useDispatch();

  const data = productList || [];
  const limit = 50;
  const totalItems = 1000;

  const getProductsIdsAndBrands = (page) => {
    const offset = (page - 1) * 50;
    const totalPages = Math.ceil(totalItems / 50);

    dispatch(PRODUCTS_THUNKS.getProductsIds({ offset, limit }));

    dispatch(PRODUCTS_THUNKS.getFieldValues({ field: "brand", offset, limit }));

    setParams({ offset, limit });
    setTotalPages(totalPages);
  };

  useEffect(() => {
    getProductsIdsAndBrands(currentPage);
  }, [currentPage]);

  const handlePrevPage = () =>
    dispatch(PRODUCTS_ACTIONS.setCurrentPage(Math.max(currentPage - 1, 1)));

  const handleNextPage = () =>
    dispatch(
      PRODUCTS_ACTIONS.setCurrentPage(Math.min(currentPage + 1, totalPages))
    );

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="container">
      <h2>Список товаров</h2>

      <ProductFilter params={params} />

      <ul>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : data.length > 0 ? (
          data.map((product, i) => (
            <ProductItem key={product.id} index={i + 1} {...product} />
          ))
        ) : (
          <h1>Товаров нет</h1>
        )}
      </ul>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={isPrevDisabled}>
          Предыдущая страница
        </button>

        <p>Страница: {currentPage}</p>

        <button onClick={handleNextPage} disabled={isNextDisabled}>
          Следующая страница
        </button>
      </div>
    </div>
  );
};

export default ProductList;
