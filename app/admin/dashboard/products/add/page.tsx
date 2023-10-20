import ProductAddForm from "@/components/dashboard/products/add-form";

const ProductAdd = () => {
  return (
    <section className="flex flex-col gap-8">
      <h2>Add Product</h2>
      <ProductAddForm />
    </section>
  );
};

export default ProductAdd;
