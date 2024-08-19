import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBar from './Pages/NavBar/Nav'
import HomePage from './Pages/HomePage/Home'
import Footer from './Pages/Footer/Footer'
import Signup from './Pages/UserAuthentication/Signup'
import Login from './Pages/UserAuthentication/Login'
import User from './Pages/User/User'
import AdminLogin  from './Pages/Admin/Adlogin'
import AdmNav from './Pages/Admin/AdminNavBar/AdNav'
import AdmHome from './Pages/Admin/AdminHome/AdHome'
import AddCourseForm from './Pages/Admin/AddCourse/AddCourseForm'
import AddUserForm from './Pages/Admin/AddUser/AddUserForm'
import UserList from './Pages/Admin/UserDetails/UserDetails'
import CourseList from './Pages/Admin/CourseDetails/CourseDetails'
import SpecificCourse from './Pages/SpecificCourseDetails/SpecificCourse'
import BackToTopButton from './Pages/BackToTopButton/BackToTopButton'
import MyCourses from './Pages/UserPurchsedCourses/MyCourses'

const DefaultLayout = ({ children }) => (
  <div>
   
    
    {children}
    
  </div>
);

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <BrowserRouter>
        
        
      <Routes>
      <Route
          path="/"
          element={
            <DefaultLayout>
              <NavBar />
              <BackToTopButton/>
              <HomePage />
              <Footer />
               
            </DefaultLayout>
          }
        />

      <Route
          path="/login"
          element={
            <DefaultLayout>
              <Login/>
               
            </DefaultLayout>
          }
        />

        <Route
          path="/register"
          element={
            <DefaultLayout>
              <Signup/>
               
            </DefaultLayout>
          }
        />

{
        isUserSignedIn && <Route
          path="/home"
          element={
            <DefaultLayout>
              <User/>
              <BackToTopButton/>
            </DefaultLayout>
          }
        />
      }
        <Route
          path="/admin"
          element={
            <DefaultLayout>
              <AdminLogin />
            </DefaultLayout>
          }
        />

        <Route
          path="/admin/home"
          element={
            <DefaultLayout>
              <AdmNav />
              <BackToTopButton/>
              <AdmHome/>
            </DefaultLayout>
          }
        />
        <Route
          path="/admin/add/courses"
          element={
            
            <DefaultLayout>
              
              <AddCourseForm/>
              <BackToTopButton/>
            </DefaultLayout>
          }
        />
        <Route
          path="/admin/add/users"
          element={
            
            <DefaultLayout>
              
              <AddUserForm/>
              <BackToTopButton/>
            </DefaultLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            
            <DefaultLayout>
              
              <UserList/>
              <BackToTopButton/>
            </DefaultLayout>
          }
        />
        <Route
          path="/admin/courses"
          element={
            
            <DefaultLayout>
              
              <CourseList/>
              <BackToTopButton/>
            </DefaultLayout>
          }
        />
        {
        isUserSignedIn && 
        <Route
          path="/courses/:courseName"
          element={
            
            <DefaultLayout>
              
              <SpecificCourse/>
              <BackToTopButton/>
            </DefaultLayout>
          }
        />
}

{
        isUserSignedIn && 
        <Route
          path="user/mycourses"
          element={
            
            <DefaultLayout>
              
              <MyCourses/>
            </DefaultLayout>
          }
        />
        }      
      </Routes>
    
    
    
    </BrowserRouter>
  );
}

export default App;
