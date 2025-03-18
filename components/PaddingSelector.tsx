import useCanvasStore from "@/store/canvasStore";

const PaddingSelector = () => {
  const { padding, setPadding } = useCanvasStore();

  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm font-sesame">Padding</h1>
      <div className="flex items-center gap-2">
        {[16, 32, 64, 128].map((value) => (
          <button
            key={value}
            className={`px-2 py-1 font-sesame text-sm font-semibold rounded-md ${
              padding === value
                ? "bg-[#303030] text-white"
                : " text-[#6f6e6e] hover:text-white ease-in-out duration-200"
            }`}
            onClick={() => setPadding(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaddingSelector;
