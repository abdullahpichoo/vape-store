import ProductEditForm from "@/components/dashboard/products/edit-form";
import { getProduct } from "@/helpers/network/products";
import { ProductType } from "@/types/api/product";

async function getData(productId: string): Promise<ProductType> {
  try {
    return await getProduct(productId);
  } catch {
    throw new Error();
  }
}

const ProductEdit = async ({ params }: { params: { productId: string } }) => {
  const productData = await getData(params.productId);
  return (
    <section className="flex flex-col gap-8">
      <h2>Edit Your Product</h2>
      <ProductEditForm productData={productData} />
    </section>
  );
};

export default ProductEdit;
