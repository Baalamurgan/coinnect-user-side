import React from "react";

const displayPrice = ({ price, gst }: { price: number; gst: number }) => {
  return (
    <>
      ₹{price.toFixed(2)} +<span className="text-xs"> {gst}% GST</span>
    </>
  );
};

export default displayPrice;
