import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import Button from "@/components/ui/btn";
import Card from "@/components/ui/card";
import InputController from "@/components/ui/form/input-controller";
import { categories } from "@/contants/product/categories";
import { ProductsFilterParams } from "@/helpers/queries/products/categories/fetch";
import { ProductFilterFormValues } from "@/types/api/product";

interface FilterFormProps {
  params: ProductsFilterParams;
  onChangeParams: (params: ProductsFilterParams) => void;
}

const FilterForm = (props: FilterFormProps) => {
  const { params, onChangeParams } = props;

  const { handleSubmit, control } = useForm<ProductFilterFormValues>({
    defaultValues: {
      categories: params.categories,
      priceRange: params.priceRange,
    },
  });

  const onFilterChange = (values: ProductFilterFormValues) => {
    const { categories, priceRange } = values;
    onChangeParams({
      ...params,
      categories: categories,
      priceRange: {
        min: priceRange.min,
        max: priceRange.max,
      },
    });
  };

  return (
    <>
      <Card className="filter sticky top-0 z-[500] col-span-12 lg:col-span-2 h-fit">
        <form action="" onSubmit={handleSubmit(onFilterChange)}>
          <div className="categories-filter flex flex-col sm:flex-row lg:flex-col justify-between align-middle gap-5">
            <h5>Filters</h5>
            <div className="form-item flex flex-col gap-2 w-full">
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
                    {...field}
                    isMulti
                    options={categories}
                    className="z-[100]"
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
    </>
  );
};

export default FilterForm;
