🚀 EasyTeam - Team Management Simplified

EasyTeam is a modern team management system designed to streamline task assignments, track progress, and enhance productivity. With dedicated dashboards for admins and members, it provides an intuitive interface for managing tasks, viewing performance, and staying organized.

🌟 Features
Admin Dashboard:
  Assign tasks to employees.
  Manage employees and view individual progress with track completed,    pending, and failed tasks.

Employee Dashboard:
  View assigned tasks.
  Update task status (In Progress, Completed, Failed).
  Manage personal profile details.

Authentication & Database:
  Secure login for both Admin and Employees using Appwrite.
  Appwrite database integration for task updates.

🛠️ Tech Stack
  Frontend: React, Tailwind CSS, Prime React
  Backend: Appwrite
  Tools: ChatGPT
  Hosting: Vercel

⚙️ Installation & Setup
  To run this project locally, follow these steps:

  1. Clone the repository
    git clone https://github.com/NajibHos/easyteam.git
    cd easyteam

  2. Install dependencies
    npm install

  3. Set up environment variables Create a .env file in the root directory and add your Appwrite credentials:
    VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
    VITE_APPWRITE_PROJECT_ID=your_project_id
    VITE_APPWRITE_DATABASE_ID=your_database_id
    VITE_APPWRITE_DATABASE_COLLECTION_TASKS_ID=your_tasks_collection_id
    VITE_APPWRITE_DATABASE_COLLECTION_MEMBERS_ID=your_members_collection_id

  4. Run the project
    npm run dev

⚠️ License & Usage
  This project is built by Najib Hossain. Feel free to explore and learn  from it, but redistributing or using it under a different name without  proper credit is not allowed.

  If you are a recruiter viewing this project, feel free to contact me at [najibhossn@gmail.com] or visit my portfolio: [https://portfolio-web-app-weld.vercel.app]

📩 Reporting Misuse
  If you find this project being misused without credit, please report it.

🔗 Project by [Najib Hossain] | 🌐 [https://portfolio-web-app-weld.vercel.app]