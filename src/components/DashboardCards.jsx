
/* eslint-disable react/prop-types */
const DashboardCards = ({data}) => {
  console.log('fix');

  return (
    <div className="h-[140px] w-[60%] md:max-lg:w-[160px]
     lg:max-2xl:w-[220px] flex flex-col
     justify-center items-center gap-4 p-8 border-2 border-zinc-200
     rounded-2xl">

      <div className="w-full text-left">
        <h2 className="text-lg text-zinc-800 font-semibold
        font-poppins">
          {data.title}
        </h2>
      </div>

        <div className="w-full text-left">
          <h2 className="text-2xl text-zinc-950 font-semibold
           font-poppins">
           {data.count}
        </h2>
        </div>

      </div>


  )
}

export default DashboardCards