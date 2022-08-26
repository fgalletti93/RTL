import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = ({ setOrderPhase}) => {
  const [OrderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {OrderDetails.totals.grandTotal}</h2>
      <button onClick={() => setOrderPhase('review')}>Order Summary</button>
    </div>
  );
};

export default OrderEntry;
