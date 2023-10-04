
const Statistics = () => {
    return (
        <div className="stats grid justify-center my-5 gap-1 md:gap-10 shadow bg-slate-100 md:w-full" >
  
  <div className="stat place-items-center ">
    <div className="stat-title text-sm md:text-xl">Total Sold(2023)</div>
    <div className="stat-value text-sm md:text-3xl">21K</div>
    <div className="stat-desc text-sm md:text-xl">From January 1st to till now</div>
  </div>
  
  <div className="stat place-items-center ">
    <div className="stat-title text-sm md:text-xl">Customers</div>
    <div className="stat-value text-sm text-cyan-600 md:text-3xl">5,500</div>
    <div className="stat-desc text-sm text-cyan-600 md:text-xl">↗︎ 40 (2%)</div>
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title text-sm md:text-xl">Website Viewers(per day)</div>
    <div className="stat-value text-sm md:text-3xl">700</div>
    <div className="stat-desc text-sm md:text-xl">↘︎ 80 (14%)</div>
  </div>
  
</div>
    );
};

export default Statistics;