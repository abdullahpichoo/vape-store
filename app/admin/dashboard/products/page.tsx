import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ProductType } from "@/types/api/product";

import { columns } from "./columns";

async function getData(): Promise<ProductType[]> {
  try {
    const res = await fetch(`${process.env.LOCAL_BASE_URL}/api/products`, {
      cache: "no-store",
    });
    const data = await res.json();
    const products = data.body.payLoad.map((product: ProductType) => {
      return {
        ...product,
        images: product.images.map((image) => image.url),
      };
    });
    console.log("Products", products);
    return products;
  } catch {
    throw new Error();
  }
}

export default async function DashboardProducts() {
  const productsData = await getData();

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between items-center mb-4">
        <h2>Products</h2>
        <Button size={"lg"}>
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add Product
        </Button>
      </div>
      <DataTable columns={columns} data={productsData} />
    </div>
  );
}
