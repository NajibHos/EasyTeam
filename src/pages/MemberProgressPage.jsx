import DashboardCards from "../components/DashboardCards";
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { memberID, memberDocID } from "./AdminDashboard";
import SkeletonLoading from "../components/SkeletonLoading";
import { databases } from "../appwrite/appwrite";
import { Query } from "appwrite";


const MemberProgressPage = () => {

  const [loading, setLoading] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    jobRole: ''

  });

  const getTasks = async () => {

      if (!memberID) return;

      setLoading(true);

      // fetching member's tasks
      try {
        const docs = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_TASKS_ID,
            [
              Query.equal('user_id', memberID)
            ]
          )

          setTasksData(docs.documents);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }

      // fetching member's personal data
      try {
        const data = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_MEMBERS_ID,
          memberDocID
        );

        setProfileData({
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          role: data.role || "",
        });

      } catch (error) {
        console.error("Error fetching profile data:", error);
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

  if (loading) {
    return <SkeletonLoading />
  }

  return (
    <div className="h-[260vh] sm:max-2xl:h-[150vh] w-full flex
     justify-center items-center">
      <div className="h-full w-[80%] flex flex-col justify-center
      items-center gap-20">

        <div className="h-auto w-full flex flex-col justify-center
        items-center gap-14">

          <div className="h-auto text-center">
            <h2 className="text-xl font-semibold font-poppins
            text-zinc-900">
              Personal Info
            </h2>
          </div>

          <div className="w-full flex flex-col sm:max-2xl:flex-row
           justify-center items-center sm:max-2xl:justify-between
           gap-10 sm:max-2xl:gap-0">

            <div className="h-auto w-full sm:max-2xl:w-[20%]
             flex justify-center items-center">
              <div className="p-8 rounded-full bg-zinc-100">
                <i className="pi pi-user text-zinc-900
                text-4xl"></i>
              </div>
             </div>
            <div className="h-auto w-full sm:max-2xl:w-[70%] flex
            flex-col sm:max-2xl:flex-row justify-center
             sm:max-2xl:justify-between items-center flex-wrap">

              <div className="h-auto w-full sm:max-2xl:w-[40%]
               flex flex-col gap-2 mb-6 sm:max-2xl:mb-0">
                <div className="h-auto w-full text-left">
                  <p className="text-base text-zinc-400 font-semibold
                  font-poppins">
                    Name
                  </p>
                </div>
                <div className="h-auto w-full text-left">
                  <h2 className="text-xl text-zinc-900 font-semibold
                  font-poppins">
                    {profileData.name}
                  </h2>
                </div>
              </div>
              <div className="h-auto w-full sm:max-2xl:w-[40%]
               flex flex-col gap-2">
                <div className="h-auto w-full text-left">
                  <p className="text-base text-zinc-400 font-semibold
                  font-poppins">
                    Email
                  </p>
                </div>
                <div className="h-auto w-full text-left">
                  <h2 className="text-xl text-zinc-900 font-semibold
                  font-poppins">
                    {profileData.email}
                  </h2>
                </div>
              </div>
              <div className="h-auto w-full sm:max-2xl:w-[40%]
               flex flex-col gap-2
              mt-6">
                <div className="h-auto w-full text-left">
                  <p className="text-base text-zinc-400 font-semibold
                  font-poppins">
                    Job Role
                  </p>
                </div>
                <div className="h-auto w-full text-left">
                  <h2 className="text-xl text-zinc-900 font-semibold
                  font-poppins">
                    {profileData.role}
                  </h2>
                </div>
              </div>
              <div className="h-auto w-full sm:max-2xl:w-[40%]
               flex flex-col gap-2
              mt-6">
                <div className="h-auto w-full text-left">
                  <p className="text-base text-zinc-400 font-semibold
                  font-poppins">
                    Address
                  </p>
                </div>
                <div className="h-auto w-full text-left">
                  <h2 className="text-xl text-zinc-900 font-semibold
                  font-poppins">
                    {profileData.address}
                  </h2>
                </div>
              </div>

            </div>

          </div>

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
        items-center gap-14">
          <div className="h-auto w-full text-center">
            <h2 className="text-xl font-semibold font-poppins
            text-zinc-900">
            Member Progress
            </h2>
          </div>
          <div className="h-auto w-full flex justify-center items-center">
            <DataTable value={tasksData} paginator rows={5}
             className="w-full">
            <Column field="title" header="Task Name" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="created_at" header="Assigned"></Column>
            <Column field="deadline" header="Due Date"></Column>
          {/* <Column body={actionTemplate} header="Actions"></Column> */}
            </DataTable>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemberProgressPage