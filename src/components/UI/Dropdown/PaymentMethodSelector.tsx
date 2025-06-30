import { useProductContext } from "../../../store/ProductContext";

const PaymentMethodSelector = () => {
  const { paymentOption, setPaymentOption } = useProductContext();

  const options = [
    { id: "cod", label: "Cash on Delivery (COD)" },
    { id: "card", label: "Credit / Debit Card" },
    { id: "upi", label: "UPI (Google Pay / PhonePe)" },
  ];

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      <h2 className="text-md font-semibold mb-3">Select Payment Method</h2>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`border p-3 rounded-lg flex items-center gap-2 cursor-pointer ${
              paymentOption === option.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={paymentOption === option.id}
              onChange={() => setPaymentOption(option.id)}
              className="accent-blue-500"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
