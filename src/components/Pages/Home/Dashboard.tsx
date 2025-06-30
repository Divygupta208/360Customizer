const Dashboard = () => {
  return (
    <div className="w-screen h-screen">
      <div className="h-[90%] flex justify-center items-center">
        <h1 className="font-bold text-4xl flex">
          Dashboard{" "}
          <span className="text-blue-700">
            <img
              src="https://www.svgrepo.com/show/485513/dashboard-layout.svg"
              className="w-30 h-30 object-contain"
            />
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
