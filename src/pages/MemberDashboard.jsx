import DashboardCards from "../components/DashboardCards";
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "../context/AuthContext";
import { databases } from "../appwrite/appwrite";
import { Query } from "appwrite";
import { useNavigate } from 'react-router-dom';
import SkeletonLoading from "../components/SkeletonLoading";

export let taskID = '';

const MemberDashboard = () => {

  const { userID, userName } = useAuth();
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetching tasks
  const getTasks = async () => {

    if (!userID) return;

    setLoading(true);

    try {
      const docs = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_TASKS_ID,
          [
            Query.equal('user_id', userID)
          ]
        )

      setTasksData(docs.documents);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);

  }

  useEffect(() => {

    getTasks();

  }, [])

  const memberCardsData = [
    {
      title: 'New Tasks',
      count: 0
    },
    {
      title: 'Pending',
      count: 0
    },
    {
      title: 'Completed',
      count: 0
    },
    {
      title: 'Failed',
      count: 0
    }

  ]

  // updating tasks progress counts
  tasksData.forEach((v) => {
    // console.log(`${i} : ${v.status}`);

    switch (v.status) {
      case 'new':
        memberCardsData[0].count++
        break;
      case 'in-progress':
        memberCardsData[1].count++
        break;
      case 'completed':
        memberCardsData[2].count++
        break;
      case 'failed':
        memberCardsData[3].count++
        break;

      default:
        console.log('hello');
        break;
    }

  })

  const updateTaskStatus = async (docID, newStatus) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_MEMBERS_ID,
       docID,
       {'status' : newStatus}
      );

      //Refetch task after updating
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const actionTemplate = (rowData) => {

    return (
      <div className="flex justify-start items-center gap-4">
        <Button
          icon='pi pi-pen-to-square' size="small"
          className="bg-zinc-900 text-white rounded-xl
          border-0 outline-0 active:outline-0 focus:outline-0"
          onClick={() => updateTaskStatus(rowData.$id, 'in-progress')}
          disabled={rowData.status === 'in-progress'}
        />
        <Button
          icon='pi pi-check' size="small"
          className="bg-zinc-900 text-white rounded-xl
          border-0 outline-0 active:outline-0 focus:outline-0"
          onClick={() => updateTaskStatus(rowData.$id, 'completed')}
          disabled={rowData.status === 'completed'}
        />
        <Button
          icon='pi pi-times' size="small"
          className="bg-zinc-900 text-white rounded-xl
          border-0 outline-0 active:outline-0 focus:outline-0"
          onClick={() => updateTaskStatus(rowData.$id, 'failed')}
          disabled={rowData.status === 'failed'}
        />
        <Button
          size="small" label='View'
          className="bg-zinc-900 text-white rounded-xl
          border-0 outline-0 active:outline-0 focus:outline-0"
          onClick={() => {
            // console.log(rowData.$id);
            taskID = rowData.$id;
            navigate('/member/task-view');
          }
          }
        />
      </div>
    );
  };

  if (loading) {
    return <SkeletonLoading />
  }

  return (
    <div className="h-[200vh] sm:max-2xl:h-[130vh] w-full flex
     justify-center items-center">
      <div className="h-full w-[80%] flex flex-col justify-center
      items-center gap-20">

        <div className='h-auto w-full text-left'>
          <h2 className='text-xl font-semibold font-poppins
          text-zinc-800'>
            Welcome {userName}
          </h2>
        </div>

        <div className="h-auto w-full flex flex-col md:max-2xl:flex-row
        justify-center items-center gap-8
        md:max-2xl:justify-between md:max-2xl:items-center
        md:max-2xl:gap-0">
          {
            memberCardsData.map((v, i) => {
              return <DashboardCards data={v} key={i} />
            })
          }
        </div>

        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-16">
          <div className="h-auto w-full text-center">
           <h2 className='text-xl font-semibold font-poppins
           text-zinc-800'>
             Tasks below
           </h2>
          </div>
          <div className="h-auto w-full">
          <DataTable value={tasksData} paginator rows={5}
           className="w-full">
           <Column field="title" header="Task Name" sortable></Column>
           <Column field="status" header="Status" sortable></Column>
           <Column field="deadline" header="Due Date"></Column>
           <Column body={actionTemplate} header="Actions"></Column>
          </DataTable>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemberDashboard;