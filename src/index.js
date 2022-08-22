import React from "react";
import ReactDOM from "react-dom/client";
import Container from "react-bootstrap/Container";
import SummaryForm from "../src/pages/Summary/SummaryForm";
import OrderEntry from "../src/pages/entry/OrderEntry";
import "bootstrap/dist/css/bootstrap.min.css";

import { OrderDetailsProvider } from "./context/OrderDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Container>
      <OrderDetailsProvider>
        {/*summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/*confirmation page does not need provider*/}
    </Container>
    <SummaryForm />
  </React.StrictMode>
);
