import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FAILED_TO_GET_PRODUCTS } from "@/contants/errorMsgs";
import { getProducts } from "@/helpers/network/products";
import { baseUrl } from "@/routes/api";
import { ProductType } from "@/types/api/product";

import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<ProductType[]> {
  try {
    const payloadProducts = await getProducts();
    const products = payloadProducts.map((product: ProductType) => {
      return {
        ...product,
        images: product.images?.map((image) => image.url),
      };
    });
    return products;
  } catch {
    throw new Error(FAILED_TO_GET_PRODUCTS);
  }
}

export default async function DashboardProducts() {
  if (!baseUrl) {
    return null;
  }

  let data: ProductType[] = [];
  const productsData = await getData();
  if (productsData && productsData.length > 0) {
    data = productsData;
  }

  return (
    <>
      <div className="container mx-auto py-5">
        <div className="flex justify-between items-center mb-4">
          <h2>Products</h2>
          <Link href={"/admin/dashboard/products/add"}>
            <Button size={"lg"}>
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />{" "}
              <span className="hidden sm:inline-block">Add Product</span>
            </Button>
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
