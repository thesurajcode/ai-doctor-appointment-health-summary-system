const DashboardCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      className={`${color} p-6 rounded-xl shadow-md`}
    >
      <h2 className="text-xl font-semibold text-gray-700">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;