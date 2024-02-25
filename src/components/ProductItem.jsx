/* eslint-disable react/prop-types */

const ProductItem = ({ id, product, price, brand, index }) => (
  <li key={id}>
    <p>№ {index}</p>
    <p>ID: {id}</p>
    <p>Name: {product}</p>
    <p>Price: {price}</p>
    <p>Brand: {brand || "Нету"}</p>
  </li>
);

export default ProductItem;
