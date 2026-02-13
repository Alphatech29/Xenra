"use client";

import { useState } from "react";
import Button from "../../../../components/ui/button";
import SelectPopup from "../../../../components/ui/selectPopup";

export default function SellGiftCard() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("Physical");
  const [amount, setAmount] = useState("");

  const [cardType, setCardType] = useState("");
  const [category, setCategory] = useState("");

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    options: [],
    onSelect: () => {},
  });

  const rate = 750;
  const nairaValue = amount ? amount * rate : 0;

  const openPopup = (title, options, onSelect) => {
    setPopup({ open: true, title, options, onSelect });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 md:px-10">
      <div className="mx-auto max-w-2xl space-y-8">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            {/* Filter */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="text-sm text-secondary-500">Filter by:</span>

              <div className="flex flex-wrap bg-silver-100 rounded-full p-1">
                {["Physical", "E-code"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setType(item)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition
                      ${
                        type === item
                          ? "bg-primary-300 shadow text-secondary-900"
                          : "text-secondary-500"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div
                onClick={() =>
                  openPopup(
                    "Select Card Type",
                    ["Amazon", "iTunes", "Steam", "Google Play"],
                    setCardType
                  )
                }
                className="h-14 w-full rounded-2xl bg-silver-100 px-5 flex items-center text-sm cursor-pointer text-secondary-600"
              >
                {cardType || "Select Card Type"}
              </div>

              <button className="inline-flex items-center gap-2 rounded-full bg-green-50 px-5 py-2 md:text-sm font-medium text-green-700 w-fit xs:text-[10px]">
                Autofill from Favourites →
              </button>

              <div
                onClick={() =>
                  openPopup(
                    "Select Gift Card Category",
                    ["USA", "UK", "Canada", "Australia"],
                    setCategory
                  )
                }
                className="h-14 w-full rounded-2xl bg-silver-100 px-5 flex items-center text-sm cursor-pointer text-secondary-600"
              >
                {category || "Select Gift Card Category"}
              </div>

              <input
                type="number"
                placeholder="Enter Gift Card Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 w-full rounded-2xl bg-silver-100 px-5 text-sm text-secondary-600 focus:outline-primary-200"
              />

              <div className="h-14 w-full rounded-2xl bg-silver-100 px-5 flex items-center font-semibold text-green-600">
                ₦ {nairaValue.toLocaleString()}
              </div>

              <textarea
                placeholder="Optional Comments: E.G - E-code"
                className="h-20 w-full rounded-2xl bg-silver-100 px-5 py-4 text-sm resize-none text-secondary-600 focus:outline-primary-200"
              />

              <div className="flex items-center gap-3 text-sm text-secondary-600">
                <div className="h-12 w-12 rounded-full bg-silver-100 flex items-center justify-center">
                  📷
                </div>
                Upload Gift Card Image(s)
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!amount}
                className="w-full sm:w-auto px-10 py-3 font-semibold rounded-full"
              >
                Proceed →
              </Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Review Transaction
              </h2>

              <div className="rounded-2xl bg-gray-50 p-5 space-y-3 text-sm">
                {[
                  ["Card Type", cardType],
                  ["Category", category],
                  ["Amount", `$${amount}`],
                  ["Exchange Rate", `₦${rate}/$`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}

                <div className="flex justify-between font-semibold text-green-600 pt-2">
                  <span>You’ll Receive</span>
                  <span>₦ {nairaValue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-6">
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-8 py-3 rounded-full border text-sm"
              >
                Back
              </button>

              <button className="w-full sm:w-auto px-10 py-4 rounded-full bg-green-600 text-white font-semibold">
                Submit →
              </button>
            </div>
          </>
        )}

        {/* POPUP */}
        <SelectPopup
          open={popup.open}
          title={popup.title}
          options={popup.options}
          onSelect={popup.onSelect}
          onClose={closePopup}
        />
      </div>
    </div>
  );
}
