import useCanvasStore from "@/store/canvasStore";

const PaddingSelector = () => {
  const { padding, setPadding } = useCanvasStore();

  return (
    <div>
      <h1 className="text-white">Padding</h1>
      <div className="flex items-center gap-2">
        {[16, 32, 64, 128].map((value) => (
          <button
            key={value}
            className={`px-3 py-1 rounded-md ${
              padding === value
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
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
