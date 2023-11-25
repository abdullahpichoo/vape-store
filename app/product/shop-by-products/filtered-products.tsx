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
  onFilterChange: (values: ProductFilterFormValues) => void;
}

const FilteredProducts = (props: FilteredProductsProps) => {
  const { productsData, onFilterChange } = props;

  const { handleSubmit, control, reset, register } =
    useForm<ProductFilterFormValues>({
      defaultValues: {
        categories: [],
        priceRange: {
          min: 1,
          max: 500,
        },
      },
    });

  return (
    <>
      <section className="grid grid-cols-12 gap-5 sm:-mx-20 md:-mx-32 xl:-mx-[28rem]">
        <Card className="filter col-span-12 lg:col-span-2 h-fit">
          <form action="" onSubmit={handleSubmit(onFilterChange)}>
            <div className="categories-filter flex flex-col sm:flex-row lg:flex-col justify-between align-middle gap-5">
              <h5>Filters</h5>
              <div className="form-item flex flex-col gap-2 w-full relative">
                <label
                  htmlFor={"categories"}
                  className="font-semibold text-neutral-600 ms-1 text-[1.2rem] md:text-[1.6rem]"
                >
                  Categories
                </label>
                <Controller
                  control={control}
                  name={"categories"}
                  render={({ field }) => (
                    <Select
                      isMulti
                      {...field}
                      options={categories}
                      className="z-[1000]"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-2">
                <InputController
                  control={control}
                  name={"priceRange.min"}
                  type="number"
                  label="Min Price (USD)"
                  placeholder="$1"
                />
                <InputController
                  control={control}
                  name={"priceRange.max"}
                  type="number"
                  label="Max Price (USD)"
                  placeholder="$500"
                />
              </div>
            </div>
            <div className="my-5 text-center lg:text-start">
              <Button variant="black" size="sm">
                Apply Filter
              </Button>
            </div>
          </form>
        </Card>
        <div className="col-span-12 lg:col-span-10">
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
        </div>
      </section>
    </>
  );
};

export default FilteredProducts;
