import Container from "react-bootstrap/Container";
import SummaryForm from "../src/pages/Summary/SummaryForm";
import OrderEntry from "../src/pages/entry/OrderEntry";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderSummary from "./pages/Summary/OrderSummary";
import { useState } from "react";

const App = () => {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = SummaryForm;
      break;
    case 'completed':
      Component = OrderSummary;
      break;
    default:
  }
  return (
    <div>
      <OrderDetailsProvider>
        <Container>
          {<Component setOrderPhase={setOrderPhase}/>}
        </Container>
      </OrderDetailsProvider>
    </div>
  );
};

export default App;
