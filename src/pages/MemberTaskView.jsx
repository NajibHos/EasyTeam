import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
import { databases } from '../appwrite/appwrite';
import SkeletonLoading from '../components/SkeletonLoading';


const MemberTaskView = () => {

  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { taskID } = location.state || {};

  // function to fetch task data
  const fetchTasks = async () => {

    if (!taskID) return;

    setLoading(true);

    try {
      const data = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_TASKS_ID,
        taskID.toString()
      );

      // console.log(data);

      setTaskData(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);

  }

  // Fetch task data when component mounts or when taskID changes
  useEffect(() => {

    fetchTasks();

  }, [])

  const updateTask = async (updateData) => {
    try {
      await databases.updateDocument(
       import.meta.env.VITE_APPWRITE_DATABASE_ID,
       import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_TASKS_ID,
       taskID,
       {'status' : updateData}
      );

      //Refetch task after updating
      fetchTasks();
    } catch (error) {
      console.error(error);
    }

  }

  if (loading) {
    return <SkeletonLoading />
  }


  return (
    <div className="h-[70vh] md:max-2xl:h-[80vh] w-full
     flex justify-center items-center">
      <div className="h-[80%] w-[80%] flex flex-col justify-start
      items-start gap-8">

        <div className="h-auto w-full">
          <h2 className='text-zinc-900 font-semibold font-poppins
          text-2xl'>
            {taskData.title || 'fetching..'}
          </h2>
        </div>

        <div className="h-auto w-full flex justify-start items-center
        gap-6 sm:max-2xl:gap-8">

          <span className='hidden lg:max-2xl:block'>
          <Button label='New' icon='pi pi-plus'
           size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'new'}/>
          </span>

          <span className='block lg:max-2xl:hidden'>
          <Button icon='pi pi-plus'
           size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'new'} />
          </span>

          <span className='hidden lg:max-2xl:block'>
          <Button label='In Progress' icon='pi pi-pen-to-square'
           size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'in-progress'}
          onClick={() => {updateTask('in-progress')}} />
          </span>

          <span className='block lg:max-2xl:hidden'>
          <Button icon='pi pi-pen-to-square'
           size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'in-progress'}
          onClick={() => {updateTask('in-progress')}} />
          </span>

          <span className='hidden lg:max-2xl:block'>
          <Button label='Completed' icon='pi pi-check' size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'completed'}
          onClick={() => {updateTask('completed')}} />
          </span>

          <span className='block lg:max-2xl:hidden'>
          <Button icon='pi pi-check' size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'completed'}
          onClick={() => {updateTask('completed')}} />
          </span>

          <span className='hidden lg:max-2xl:block'>
          <Button label='Failed' icon='pi pi-times' size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'failed'}
          onClick={() => {updateTask('failed')}} />
          </span>

          <span className='block lg:max-2xl:hidden'>
          <Button icon='pi pi-times' size='small'
          className={`bg-zinc-900 text-white border-0 outline-none
          font-poppins font-medium`}
          disabled={taskData.status === 'failed'}
          onClick={() => {updateTask('failed')}} />
          </span>

        </div>

        <div className="h-auto w-full">
          <p className='text-zinc-900 font-semibold font-poppins
          text-lg'>
            {taskData.description || 'fetching..'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemberTaskView