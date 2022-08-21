import React from "react";
import ReactDOM from "react-dom/client";
import SummaryForm from "../src/pages/Summary/SummaryForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Options from "../src/pages/entry/Options";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Options />
    <SummaryForm />
  </React.StrictMode>
);
