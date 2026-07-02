import useAuth from "../../hooks/useAuth";

const TopNavbar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow p-5 flex justify-between">
      <h2 className="text-2xl font-bold">
        Doctor Dashboard
      </h2>

      <p className="font-semibold">
        Welcome, {user?.name}
      </p>
    </div>
  );
};

export default TopNavbar;