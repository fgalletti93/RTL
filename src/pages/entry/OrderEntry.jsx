import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = () => {
  const [OrderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {OrderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;
