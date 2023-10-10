import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartBtn = () => {
  return (
    <div className="cart-btn bg-orange-3 flex gap-8 px-8 py-4 rounded-xl group hover:cursor-pointer">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="w-9 group-hover:scale-110 transition-all ease-in-out duration-200"
        />
        <h6 className="font-medium">Cart</h6>
      </div>
      <div className="items-count text-white px-5 py-2 bg-black rounded-full group-hover:scale-110 transition-all ease-in-out duration-200">
        0
      </div>
    </div>
  );
};

export default CartBtn;
