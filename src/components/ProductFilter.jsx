/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_THUNKS } from "../redux/slices/products/productsThunks";
import { useDebounce } from "use-debounce";

const ProductFilter = ({ params }) => {
  const { brands } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const [debouncedName] = useDebounce(nameFilter, 1000);
  const [debouncedPrice] = useDebounce(priceFilter, 1000);

  useEffect(() => {
    dispatch(PRODUCTS_THUNKS.filterProductsByName(debouncedName));
  }, [debouncedName, dispatch]);

  useEffect(() => {
    dispatch(PRODUCTS_THUNKS.filterProductsByPrice({ debouncedPrice, params }));
  }, [debouncedPrice, dispatch, params]);

  const handleFilterByBrand = (value) => {
    setBrandFilter(value);

    dispatch(PRODUCTS_THUNKS.filterProductsByBrand({ value, params }));
  };

  return (
    <div className="filter-box">
      <div>
        <input
          type="text"
          placeholder="Фильтрация по имени"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Фильтрация по цене"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>

      <div>
        <select
          value={brandFilter}
          onChange={(e) => handleFilterByBrand(e.target.value)}
        >
          <option>Выберите бренд</option>

          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(ProductFilter);
