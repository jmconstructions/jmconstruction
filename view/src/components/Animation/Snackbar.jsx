/* eslint-disable react/prop-types */
function SnackBar({ message, type }) {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div
      className={`${bgColor} py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4`}
    >
      <p>{message}</p>
      <span
        className="cursor-pointer font-bold"
        onClick={(e) => e.target.parentNode.remove()}
      >
        <sup>X</sup>
      </span>
    </div>
  );
}

export default SnackBar;
