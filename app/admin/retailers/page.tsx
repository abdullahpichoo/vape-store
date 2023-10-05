import NewRetailer from "@/components/NewRetailer";
import getRetailers from "./api/fetchRetailers";

const Retailers = async () => {
  const retailers = await getRetailers();

  return <div>Retailers</div>;
};

export default Retailers;
