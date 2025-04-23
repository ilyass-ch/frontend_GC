import React from "react";
import sidebar from "../../components/sidebar";
import ProductGrid from "../../components/ProductGrid";

const ProductPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <sidebar />
      <ProductGrid />
    </div>
  );
};

export default ProductPage;
