import Img from "@/components/ui/image";
import { OrderType } from "@/types/api/order";
import { formatDate } from "@/utils/client";

interface OrderProps {
  order: OrderType;
}

const Order = (props: OrderProps) => {
  const { order } = props;

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-12">
          <div className="col-span-12 sm:col-span-8 flex flex-col">
            <h5 className="text-gray-500">ID:</h5>
            <p className="font-semibold text-gray-700">{order._id}</p>
          </div>
          <div className="col-span-12 sm:col-span-4 flex flex-col">
            <h5 className="text-gray-500">Status:</h5>
            <h5
              className={`capitalize ${
                order.status === "ORDERED"
                  ? "text-orange-1"
                  : order.status === "DELIVERED"
                  ? "text-green-600"
                  : "text-orange-2"
              }`}
            >
              {order.status}
            </h5>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 sm:col-span-8 flex flex-col">
            <h5 className="text-gray-500">Order Date:</h5>
            <p className="font-semibold text-gray-700">
              {order.createdAt ? formatDate(new Date(order.createdAt)) : ""}
            </p>
          </div>

          <div className="col-span-12 sm:col-span-4 flex flex-col">
            <h5 className="text-gray-500">Delivery Date:</h5>
            <p className="font-semibold text-gray-700">
              {order.deliveredAt
                ? formatDate(new Date(order.deliveredAt))
                : "Not Delivered Yet"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 sm:col-span-8 flex flex-col">
            <h5 className="text-gray-500">Shipping Address:</h5>
            <p className="font-semibold text-gray-700">
              {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}, {order.shippingAddress.zipCode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>
          <div className="col-span-12 sm:col-span-4 flex flex-col">
            <h5 className="text-gray-500">Total Price:</h5>
            <h5 className="font-bold text-gray-700">${order.totalPrice}</h5>
          </div>
        </div>

        <div className="product-images">
          <h5 className="text-gray-500">Order Items:</h5>
          <div className="grid grid-cols-12">
            {order.items.map((item) => (
              <div className="col-span-6 flex gap-3" key={item._id}>
                <Img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-[12rem] h-[12rem] object-contain flex items-center justify-center"
                />
                <div className="details flex justify-center items-start flex-col gap-3">
                  <h6 className="text-gray-700 font-semibold">
                    {item.productName}
                  </h6>
                  <p className="text-gray-500 font-semibold">
                    {item.quantity} x ${item.productPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
