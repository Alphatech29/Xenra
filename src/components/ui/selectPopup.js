"use client";

export default function SelectPopup({
  open,
  title,
  options,
  onClose,
  onSelect,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
      {/* Container */}
      <div
        className="
          w-full
          sm:max-w-md
          bg-white
          rounded-t-3xl sm:rounded-3xl
          p-5
          space-y-4
          max-h-[85vh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-white pb-2">
          <h3 className="text-base sm:text-lg font-semibold">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-silver-100 hover:bg-silver-200 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              className="
                w-full
                text-left
                px-4 py-3
                rounded-xl
                bg-silver-100
                hover:bg-primary-100
                active:scale-[0.98]
                transition
                text-sm sm:text-base
              "
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
