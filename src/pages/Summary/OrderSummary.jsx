import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderSummary = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [error, setError] = useState(false);
  const [orderNum, setOrderNum] = useState(null);
  
  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  useEffect(() => {
    axios
    .post(`http://localhost:3030/order`)
    .then((response) => {
      setOrderNum(response.data.orderNum);})
    .catch((error) => {
    setError(true)});
  }, []);

  if (error) {
    return (
      <div>
        Order number: {orderNum}
        <Button type="submit" onClick={handleClick}>
          New Order
        </Button>
      </div>
    );
  }


  return (
    <div>
      Order number: {orderNum}
      <Button onClick={handleClick}>
        New Order
      </Button>
    </div>
  );
};

export default OrderSummary;
