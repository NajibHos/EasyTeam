import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from 'react-router-dom';

// exporting the variables with id's to fetch data
export let memberID = '';
export let memberDocID = '';

const AdminDashboard = () => {

  const navigate = useNavigate();

  // static member data
  const members = [
    { id: '67a5da3c000105467e83', name: 'Najib',
       role: 'Developer', docID: '67b561940033191dc4a2'
    },
    { id: '67a87b0b0028e4757c91', name: 'Sojib',
       role: 'Designer', docID: '67bf4cb8000e2783a4a7'
    },
    { id: '67a87aa80038678aa0a9', name: 'Ovi',
       role: 'Project Manager', docID: '67bf4d360022478ec283'
    },
    { id: '67a87ad90021c7b5e97c', name: 'Omi',
       role: 'QA Engineer', docID: '67bf4d6200120360ce1b'
    },
    { id: '67a87b3d00304c1e5372', name: 'Siam',
       role: 'QA Engineer', docID: '67bf4da400217fe2bd19'
    }
  ];

  // Action Button Templates
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-8 w-auto">
        <Button
          label="View"
          icon="pi pi-eye"
          size='small'
          className="bg-zinc-900 text-white font-poppins
          border-0 outline-0"
          onClick={() => {
            memberID = rowData.id;
            memberDocID = rowData.docID;
            navigate('/admin/member-progress');
          }}
        />
      </div>
    );
  };

  return (
    <div className="h-[85vh] sm:max-2xl:h-[95vh] w-full flex
     justify-center items-center">
      <div className="h-full w-[80%] flex flex-col
       justify-center items-center gap-16">

      <div className="h-auto w-full text-center">
        <h2 className="font-semibold font-poppins text-2xl
        text-zinc-900">
          Admin Dashboard
        </h2>
      </div>

      <div className='h-auto w-full'>

      {/* PrimeReact DataTable */}
      <DataTable
          value={members}
          rows={5}
          className="w-full"
          // responsiveLayout="scroll"
        >
          <Column field="name" header="Member Name" sortable></Column>
          <Column field="role" header="Role" sortable></Column>
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ textAlign: "center", width: 'auto' }}
          ></Column>
      </DataTable>
      </div>

      </div>
    </div>
  )
}

export default AdminDashboard