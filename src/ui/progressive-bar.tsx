function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-3 w-full rounded-full bg-gray-200">
      <div
        className="h-3 rounded-full transition-all duration-300"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default ProgressBar;
