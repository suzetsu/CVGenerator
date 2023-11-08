import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
import Signup from "./Signup/signup";
import Main from "./Dashboard/main";
import Info from "./CustomerDetails/info";
import CVTemp from "./CustomerDetails/CVtemplate/CVTemp";
import SecondCVTemp from "./CustomerDetails/CVtemplate/SecondCVTemp";
import ThirdCVTemp from "./CustomerDetails/CVtemplate/ThirdCVTemp";
import CVGenerate from "./CustomerDetails/CVtemplate/CVGenerate";
import Update from "./CustomerDetails/InfoComponents/Update";
import AddCompany from "./Company/addCompany";
import ViewCompany from "./Company/viewCompany";
import ViewRole from "./Role/viewRole";
import ViewDepartment from "./Company/viewDepartment";
import EmployeeList from "./Employee/employeeList";
import CustomDropdown from "./CustomerDetails/InfoComponents/customDropdown";
import ViewAllEmployee from "./Employee/viewAllEmployee";
import NavBar from "./Dashboard/Navbar";
import TemplateList from "./CustomerDetails/CVtemplate/templateList";
import About from "./Extra/about";
import ProtectedRoute from "./ProtectedRoutes";
import EditEmployee from "./Employee/editEmployeeComponent";

const MainApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<NavBar />}>
        {/* <Route path="main" element={<Main  />}/> */}

        <Route
          path="Info"
          element={
            <ProtectedRoute>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route path="CVGenerate" element={<CVGenerate />} />
        <Route
          path="Update"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />

        <Route
          path="addCompany"
          element={
            <ProtectedRoute>
              <AddCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="viewCompany"
          element={
            <ProtectedRoute>
              <ViewCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="viewRole"
          element={
            <ProtectedRoute>
              <ViewRole />
            </ProtectedRoute>
          }
        />

        {/* <Route path="viewCompany" element={<ViewCompany />} /> */}
        {/* <Route path="viewRole" element={<ViewRole  />} /> */}
        <Route
          path="viewDepartment"
          element={
            <ProtectedRoute>
              <ViewDepartment />
            </ProtectedRoute>
          }
        />

        <Route
          path="employeeList"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="customDropdown"
          element={
            <ProtectedRoute>
              <CustomDropdown />
            </ProtectedRoute>
          }
        />
        <Route
          path="viewAllEmployee"
          element={
            <ProtectedRoute>
              <ViewAllEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="TemplateList"
          element={
            <ProtectedRoute>
              <TemplateList />
            </ProtectedRoute>
          }
        />
        <Route
          path="editEmployee"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="CVTemp"
        element={
          <ProtectedRoute>
            <CVTemp />
          </ProtectedRoute>
        }
      />
      <Route
        path="SecondCVTemp"
        element={
          <ProtectedRoute>
            <SecondCVTemp />
          </ProtectedRoute>
        }
      />
      <Route
        path="ThirdCVTemp"
        element={
          <ProtectedRoute>
            <ThirdCVTemp />
          </ProtectedRoute>
        }
      />

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
  );
};

export default MainApp;
