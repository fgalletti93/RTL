import { useEffect } from "react";
import { createContext, useContext, useState, useMemo } from "react";
import { pricePerItem } from "../constants";

//format number as currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const OrderDetails = createContext();

//custom hook to check if we are inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be use within an OrderDetailsProvider"
    );
  }

  return context;
};

const calculateSubtotal = (optionType, optionCount) => {
  let optionCounts = 0;
  for (const count of optionCount[optionType].values()) {
    optionCounts += count;
  }

  return optionCounts * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCount, setOptionCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCount);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCount);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCount]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCount = { ...optionCount };

      //update option count for this item with the new value
      const optionCountMap = optionCount[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));

      setOptionCount(newOptionCount);
    };

    const resetOrder = () => {
      setOptionCount({
        scoops: new Map(),
        toppings: new Map(),
      });
    };
    //getter: object containing option count for scoops and toppings, subtotals and totals
    //setter: update option count
    return [{ ...optionCount, totals }, updateItemCount, resetOrder];
  }, [optionCount, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};
