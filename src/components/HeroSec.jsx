import { Button } from "primereact/button"
import { Link } from "react-router-dom"


const HeroSec = () => {
  console.log('fix');
  return (
    <div className="h-[100vh] md:max-2xl:h-[80vh] w-full flex
     justify-center items-center">

      <div className="h-[80%] w-[80%] md:max-2xl:w-[60%] flex flex-col
       justify-center items-center gap-8">

        <div className="h-auto w-full text-center flex flex-col gap-4">
          <h2 className="font-semibold font-poppins text-zinc-900
          text-2xl">
          <span className="italic">Easy</span>Team
          </h2>
          <h2 className="font-semibold font-poppins text-zinc-700
          text-lg">Team Management Simplified</h2>
        </div>

        <div className="h-auto w-full text-left">
          <p className="font-medium font-poppins text-zinc-800
          text-base">
            <span className="italic">Easy</span>Team is a modern team management system designed to streamline task assignments, track progress, and enhance productivity. With dedicated dashboards for admins and members, it provides an intuitive interface for managing tasks, viewing performance, and staying organized.
          </p>
        </div>

        <div className="h-auto w-full flex flex-col justify-start
        items-start gap-4">

          <div className="h-auto w-full text-left">
          <h2 className="font-semibold font-poppins text-zinc-900
          text-lg">
          Technologies used:
          </h2>
          </div>
          <div className="h-auto w-full text-left">
          <h2 className="font-semibold font-poppins text-zinc-900
          text-base">
          Front-end: <span className="font-medium">React, PrimeReact,
             Tailwind CSS</span>
          </h2>
          </div>

          <div className="h-auto w-full text-left">
          <h2 className="font-semibold font-poppins text-zinc-900
          text-base">
          Back-end: <span className="font-medium">Appwrite (authentication
             and database)</span>
          </h2>
          </div>

          <div className="h-auto w-full text-left">
          <h2 className="font-semibold font-poppins text-zinc-900
          text-base">
          Tools: <span className="font-medium">ChatGPT</span>
          </h2>
          </div>

          <div className="h-auto w-full text-left">
          <h2 className="font-semibold font-poppins text-zinc-900
          text-base">
          Deployment: <span className="font-medium">Vercel</span>
          </h2>
          </div>

        </div>

        <div className="h-auto w-full flex justify-center items-center">
          <Link to='/login'>
          <Button label="Visit APP" size="small"
          icon='pi pi-arrow-right'className="bg-zinc-900 text-white
          outline-0 border-0 " />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default HeroSec