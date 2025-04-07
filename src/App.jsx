import { AuthProvider, useAuth } from './utils/AuthContext';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import AddTaskPage from './pages/AddTaskPage';
import MemberProgressPage from './pages/MemberProgressPage';
import MemberProfile from './pages/MemberProfile';
import MemberTaskView from './pages/MemberTaskView';
import SkeletonLoading from "./components/SkeletonLoading";

const App = () => {

  return (

    <AuthProvider>
      <Header />
       <main className='h-auto w-full'>
        <AuthRoutes />
       </main>
      <Footer />
    </AuthProvider>

  );
};

const AuthRoutes = () => {

  const { loading } = useAuth();

  if (loading) {
    return <SkeletonLoading />
  }

  return (

    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Role-Based Private Routes */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-task" element={<AddTaskPage />} />
          <Route path="/admin/member-progress"
           element={<MemberProgressPage />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['Members']} />}>
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/member/profile" element={<MemberProfile />} />
          <Route path="/member/task-view" element={<MemberTaskView />} />
        </Route>
    </Routes>
  )
}

export default App
