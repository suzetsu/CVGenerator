import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/LoginPage'
import Signup from './Signup/signup';
import Main from './Dashboard/main';
import Info from "./CustomerDetails/info"
import CVTemp from './CustomerDetails/CVtemplate/CVTemp';
import SecondCVTemp from './CustomerDetails/CVtemplate/SecondCVTemp';
import ThirdCVTemp from './CustomerDetails/CVtemplate/ThirdCVTemp';
import CVGenerate from './CustomerDetails/CVtemplate/CVGenerate';
import Update from './CustomerDetails/InfoComponents/Update';
import AddCompany from './Company/addCompany';
import ViewCompany from './Company/viewCompany';
import ViewRole from './Role/viewRole';
import ViewDepartment from './Company/viewDepartment';
import EmployeeList from './Employee/employeeList';
import CustomDropdown from './CustomerDetails/InfoComponents/customDropdown';
import ViewAllEmployee from './Employee/viewAllEmployee';
import NavBar from './Dashboard/Navbar';
import TemplateList from './CustomerDetails/CVtemplate/templateList';
import About from './Extra/about';



const MainApp = () => {



return (
    
        <Routes>
           
                
                <Route path="/login" element={<Login />} />
                
                <Route path = '/' element={<NavBar   />}>
                    <Route path="main" element={<Main  />}/>
                    
                    <Route path="Info" element={<Info  />} />
                   
                    <Route path="CVGenerate" element={<CVGenerate    />} />         
                    <Route path="Update" element={<Update />} />
                   
                    <Route path="addCompany" element={<AddCompany   />} />
                    
                    <Route path="viewCompany" element={<ViewCompany />} />
                    <Route path="viewRole" element={<ViewRole  />} />
                    <Route path="viewDepartment" element={<ViewDepartment  />} />
                    <Route path="employeeList" element={<EmployeeList  />} />
                    <Route path="customDropdown" element={<CustomDropdown />} />
                    <Route path="viewAllEmployee" element={<ViewAllEmployee  />} /> 
                    <Route path="signup" element={<Signup />} />
                    <Route path="TemplateList" element={<TemplateList />} />
                   

                </Route>
               
                <Route path="CVTemp" element={<CVTemp />} />
                    <Route path="SecondCVTemp" element={<SecondCVTemp />} />
                    <Route path="ThirdCVTemp" element={<ThirdCVTemp />} />
                
                {/*            
                <Route
                    path="/main"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Main />
                        
                        </ProtectedRoute>
                    }
                    /> */}
                
                


      
                <Route path="about" element={<About />} />
    
                </Routes>
             
             )

            }
        

export default MainApp;
        
      
        
        

