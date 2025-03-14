import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { databases } from "../appwrite/appwrite";
import { ID } from "appwrite";
import { Link } from "react-router-dom";
import { Toast } from 'primereact/toast';


const AddTaskPage = () => {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedMember, setAssignedMember] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const toast = useRef(null);

  // Member options (static data)
  const memberOptions = [
    { label: "Najib", value: "67a5da3c000105467e83" },
    { label: "Siam", value: "67a87b3d00304c1e5372" },
    { label: "Sojib", value: "67a87b0b0028e4757c91" },
    { label: "Omi", value: "67a87ad90021c7b5e97c" },
    { label: "Ovi", value: "67a87aa80038678aa0a9" }
  ];

  // formating date
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')} - ${(d.getMonth() + 1)
      .toString().padStart(2, '0')} - ${d.getFullYear()}`;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // new task data
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        status : 'new',
        deadline: deadline ? formatDate(deadline) : null,
        user_id: assignedMember,
        created_at: formatDate(new Date()),
        task_id: ID.unique()
      }

      // create new document
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_TASKS_ID,
        ID.unique(),
        newTask
      )

      // if task added successfully then the success toast will appear
      toast.current.show({severity:'success', summary: 'Success',
      detail:'Task Added!', life: 3000});

      // console.log("New Task Details: ", newTask);

      // Clear form after submission
      setTaskTitle("");
      setTaskDescription("");
      setAssignedMember(null);
      setDeadline('');

    } catch (error) {

      console.error(error);

      // if task added failed then the warning toast will appear
      toast.current.show({severity:'warning', summary: 'Failed',
      detail:'Task failed to add', life: 3000});

    }

  }


  return (
    <div className="h-[100vh] md:max-2xl:h-[130vh] w-full
     flex justify-center items-center">
    <Toast ref={toast} className="mx-10 sm:max-2xl:m-0" />
    <div className="h-full w-full flex flex-col justify-center
    items-center gap-16 md:max-lg:border">
      <div className="h-auto w-full flex justify-center items-center
       text-center">
        <h2 className="font-semibold text-2xl font-poppins
        text-zinc-900">
          Add Task
        </h2>
      </div>

      <div className="h-auto w-[80%] md:max-lg:w-[60%] lg:max-2xl:w-[50%]">
       <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Task Title */}
        <div className="form-group">
          <label htmlFor="taskTitle" className="block mb-3 font-semibold
          font-poppins text-lg">
            Task Title
          </label>
          <InputText
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full"
            required
          />
        </div>

        {/* Task Description */}
        <div className="form-group">
          <label htmlFor="taskDescription" className="block mb-3
           font-semibold font-poppins text-lg">
            Task Description
          </label>
          <InputTextarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full"
            rows={5}
            required
          />
        </div>

        {/* Assigned Member */}
        <div className="form-group">
          <label htmlFor="assignedMember" className="block mb-3
           font-semibold font-poppins text-lg">
            Assign to Member
          </label>
          <Dropdown
            id="assignedMember"
            value={assignedMember}
            options={memberOptions}
            onChange={(e) => setAssignedMember(e.value)}
            placeholder="Select a member"
            className="w-full border border-zinc-300"
            required
          />
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label htmlFor="deadline" className="block mb-3
           font-semibold font-poppins text-lg">
            Deadline
          </label>
          <Calendar
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.value)}
            placeholder="Select a deadline"
            className="w-full "
            // showIcon
            required
          />
        </div>

        {/* Buttons */}
        <div className="form-actions flex justify-center items-center
         gap-8 mt-6">
          <Button label="Add Task" icon="pi pi-check" type="submit"
          className="bg-zinc-900 text-white font-poppins
          border-0 outline-0" size="small"

          />

          <div>
            <p className="text-lg font-semibold font-poppins
            text-zinc-900">or</p>
          </div>

          <Link to='/admin/dashboard'>
            <Button label="Cancel" type="button"
            className="bg-zinc-900 text-white font-poppins
            border-0 outline-0" size="small"/>
          </Link>

        </div>
       </form>
      </div>

    </div>
  </div>
  )
}

export default AddTaskPage