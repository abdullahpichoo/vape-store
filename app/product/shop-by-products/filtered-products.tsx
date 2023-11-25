import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import Button from "@/components/ui/btn";
import Card from "@/components/ui/card";
import InputController from "@/components/ui/form/input-controller";
import ProductCard from "@/components/ui/product-card";
import { categories } from "@/contants/product/categories";
import { ProductFilterFormValues, ProductType } from "@/types/api/product";

interface FilteredProductsProps {
  productsData: ProductType[];
}

const FilteredProducts = (props: FilteredProductsProps) => {
  const { productsData } = props;

  return (
    <>
      <div className="grid grid-cols-12 lg:grid-cols-5 gap-3">
        {productsData &&
          productsData.length > 0 &&
          productsData.map((product) => (
            <div
              key={product._id}
              className="col-span-6 sm:col-span-4 lg:col-span-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </>
  );
};

export default FilteredProducts;
