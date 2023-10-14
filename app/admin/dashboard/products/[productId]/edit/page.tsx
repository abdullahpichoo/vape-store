import ProductEditForm from "@/components/dashboard/products/edit-form";
import { ProductType } from "@/types/api/product";

async function getData(productId: string): Promise<ProductType> {
  try {
    const res = await fetch(
      `${process.env.LOCAL_BASE_URL}/api/products/${productId}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    const product = data.body.payLoad;
    return product;
  } catch {
    throw new Error();
  }
}

const ProductEdit = async ({ params }: { params: { productId: string } }) => {
  const productData = await getData(params.productId);
  return (
    <section className="">
      <h2>Edit Your Product</h2>
      <ProductEditForm productData={productData} />
    </section>
  );
};

export default ProductEdit;
