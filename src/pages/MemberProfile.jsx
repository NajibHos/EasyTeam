import { useEffect, useRef, useState } from "react";
import { databases } from "../appwrite/appwrite";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import SkeletonLoading from "../components/SkeletonLoading";
import { Toast } from 'primereact/toast';

const MemberProfile = () => {

  // Toggle state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    jobRole: ''

  });

  useEffect(() => {

    // fetching profile data
    const fetchProfileData = async () => {

      setLoading(true);

      try {
        const data = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_MEMBERS_ID,
          "67b561940033191dc4a2"
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

    };

    fetchProfileData();

  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));

  };

  // Save changes and exit edit mode
  const handleSaveChanges = async (ev) => {

    ev.preventDefault();

    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_DATABASE_COLLECTION_MEMBERS_ID,
        "67b561940033191dc4a2", // document id
        profileData
      );

      // updating Ediding state
      setIsEditing(false);

      // if task added successfully then the success toast will appear
      toast.current.show({severity:'success', summary: 'Success',
      detail:'Profile Updated!', life: 3000});

    } catch (error) {

      // if task added failed then the warning toast will appear
      toast.current.show({severity:'warning', summary: 'Failed',
        detail:'Profile Update Failed!', life: 3000});

      console.error("Error updating profile:", error);
    }

  };

  if (loading) {
    return <SkeletonLoading />
  }

  return (
    <div className={`${isEditing ? 'h-[80vh] md:max-2xl:h-[100vh]' : 'h-[90vh] md:max-2xl:h-[60vh]'}
      w-full flex justify-center items-center`}>
      <Toast ref={toast} className="mx-10 sm:max-2xl:m-0" />
      <div className='h-[80%] w-[80%] flex flex-col justify-center
      items-center gap-16'>

        <div className='h-auto w-full text-center'>
         <h2 className='text-zinc-800 font-semibold text-xl
         font-poppins'>
          {isEditing ? 'Edit Profile' : 'Profile Details'}
         </h2>
        </div>

        <div
   className={`${isEditing ? 'md:max-2xl:w-[60%]' : 'md:max-2xl:w-[80%]'}
              h-auto w-full`}>

        {isEditing ? (
          // Edit Mode: Form to edit details
          <form className="flex flex-col
          justify-center items-center gap-6"
          onSubmit={handleSaveChanges}>

            <div className="w-full flex flex-col gap-2">
             <label htmlFor="name"
               className="text-zinc-800 font-poppins font-semibold">
               Name
             </label>
             <InputText id="name" type="text" required name="name"
             value={profileData.name}
             className="w-full bg-white border-2
              font-poppins
             border-zinc-200 rounded-xl text-zinc-900"
             onChange={handleInputChange}
             />
            </div>

            <div className="w-full flex flex-col gap-2">
             <label htmlFor="email"
               className="text-zinc-800 font-poppins font-semibold">
               Email
             </label>
             <InputText id="email" type="email" required name="email"
             value={profileData.email}
             className="w-full bg-white border-2
              font-poppins
             border-zinc-200 rounded-xl text-zinc-900"
             onChange={handleInputChange}
             />
            </div>

            <div className="w-full flex flex-col gap-2">
             <label htmlFor="role"
               className="text-zinc-800 font-poppins font-semibold">
               Role
             </label>
             <InputText id="role" type="text" required name="role"
             value={profileData.role}
             className="w-full bg-white border-2
              font-poppins
             border-zinc-200 rounded-xl text-zinc-900"
             onChange={handleInputChange}
             />
            </div>

            <div className="w-full flex flex-col gap-2">
             <label htmlFor="address"
               className="text-zinc-800 font-poppins font-semibold">
               Address
             </label>
             <InputText id="address" type="text" required name="address"
             value={profileData.address}
             className="w-full bg-white border-2
             font-poppins
             border-zinc-200 rounded-xl text-zinc-900"
             onChange={handleInputChange}
             />
            </div>

            <div className="flex justify-center items-center gap-8
            mt-6">

              <Button  size="small" type="submit" label='Save Changes'
             className="bg-zinc-900 text-white
             border-0 outline-0 active:outline-0 focus:outline-0"
              />

              <div className='h-auto'>
                <p className='text-lg font-semibold font-poppins
                text-zinc-700'>or</p>
              </div>

              <Button  size="small" type="button" label='Cancel'
             className="bg-zinc-900 text-white
             border-0 outline-0 active:outline-0 focus:outline-0"
             onClick={() => setIsEditing(false)} />

            </div>
          </form>
        ) : (
          <>
          <div className="w-full flex flex-col sm:max-2xl:flex-row
           justify-center items-center sm:max-2xl:justify-between
           gap-10 sm:max-2xl:gap-0">

            <div className="h-auto w-full sm:max-2xl:w-[20%]
             flex justify-center items-center">
              <div className="p-8 rounded-full bg-zinc-200">
                <i className="pi pi-user text-zinc-900
                text-4xl"></i>
              </div>
             </div>
            <div className="h-auto w-full lg:max-2xl:w-[70%] flex
            flex-col lg:max-2xl:flex-row justify-center
             lg:max-2xl:justify-between items-center flex-wrap">

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
          </>
        )}
        </div>

        <div className={`${isEditing ? 'hidden' : 'block'}
          h-auto w-full text-center`}>
          <Button  size="small" label='Edit Details'
           className="bg-zinc-900 text-white
           border-0 outline-0 active:outline-0 focus:outline-0"
           onClick={() => setIsEditing(true)} />
        </div>

      </div>
    </div>
  )
}

export default MemberProfile