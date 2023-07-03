import logo from './logo.svg';
//import './App.css';
import Student from './Components/Student';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './Components/Registration';
import { withRouter } from "react-router";
import { Sidebar } from 'react-pro-sidebar';
import { BrowserRouter } from 'react-router-dom';
import Studentprofile from './Components/Studentprofile';
import Profile from './Components/Profile';
import SmartTransaction from './Components/SmartTransaction';
import Newprofile from './Components/Newprofile';
import BlogSpot from './Components/BlogSpot'
import Directorsoffice from './Components/Directorsoffice';
import FacultyProfile from './Components/FacultyProfile';
import AcadProfile from './Components/AcadProfile';
import Administrativeoffice from './Components/Administrativeoffice';
import Cashdisburs from './Components/Cashdisburs';
import Acadoffice from './Components/Acadoffice';
import Studaffair from './Components/Studaffair';
import Recordsoffice from './Components/Recordsoffice';
import Qualityass from './Components/Qualityass';
import Admin from './Components/Admin'
import Dashboard from './Components/Dashboard';
import Usertable from './Components/Usertable';
import Transactions from './Components/Transactions'
import NewprofileVisitor from './Components/NewprofileVisitor'
import VisitorProfile from './Components/VisitorProfile'
import VisitorsProfile from './Components/VisitorsProfile'
import VDirectorOffice from './Components/VDirectorOffice'
import VAdministrativeoffice from './Components/VAdministrativeoffice'
import VAcadoffice from './Components/VAcadoffice'
import VStudaffair from './Components/VStudaffair'
import VRecordsoffice from './Components/VRecordsoffice'
import VQualityass from './Components/VQualityass'
import VCashdisburs from './Components/VCashdisburs'
import UserLog from './Components/UserLogs'
import Appointment from './Components/Appointment'
import RequestAppointment from './Components/RequestAppointment'


import { Route, Routes, useNavigate, } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<SmartTransaction />}></Route>
              <Route path="/Profile" element={<Profile />}>
                <Route path="/Profile/StudentProfile" element={<Studentprofile />}></Route>
                <Route path="/Profile/Offices" element={<div>Offices</div>}></Route>
                <Route path="/Profile/Documents" element={<div>Documents</div>}></Route>
                <Route path="/Profile/Request" element={<Student />}></Route>
                <Route path="/Profile/Appointment" element={<Appointment />}></Route>
                <Route path="/Profile/RequestAppointment" element={<RequestAppointment />}></Route>

              </Route>
              <Route path="/Newprofile" element={<Newprofile/>}></Route>
              <Route path="/AcadProfile" element={<AcadProfile/>}>
                <Route path="/AcadProfile/FacultyProfile" element={<FacultyProfile/>}></Route>
                <Route path="/AcadProfile/Message" element={<div>Message</div>}></Route>
              <Route path="/AcadProfile/Documents" element={<div>Documents</div>}></Route>
              </Route>
              <Route path="/Admin" element={<Admin/>}>
              <Route path="/Admin/Blogpost" element={<BlogSpot/>}></Route>
              <Route path="/Admin/Dashboard" element={<Dashboard/>}></Route>
              <Route path="/Admin/Message" element={<div>Message</div>}></Route>
              <Route path="/Admin/Users" element={<Usertable/>}></Route>
              <Route path="/Admin/Transactions" element={<Transactions/>}></Route>
              <Route path="/Admin/Userlogs" element={<UserLog/>}></Route>
              </Route>
              <Route path="/Newvisitor" element={<NewprofileVisitor/>}></Route>
              <Route path="/Visitor" element={<VisitorProfile/>}>
              <Route path="/Visitor/visitorprofile" element={<VisitorsProfile/>}></Route>
              <Route path="/Visitor/Offices" element={<div>Offices</div>}></Route>
                <Route path="/Visitor/Documents" element={<div>Documents</div>}></Route>
                <Route path="/Visitor/Request" element={<Student />}></Route>
                <Route path="/Visitor/Appointment" element={<Appointment />}></Route>
                <Route path="/Visitor/RequestAppointment" element={<RequestAppointment />}></Route>
              </Route>
              
               
              
           </Routes>
           
      </BrowserRouter>
    </div>
  );
}

export default App;
