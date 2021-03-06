
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Dashboard,Register,Landing,Error,ProtectedRoute,Reset,Forgot,Test ,Gmail} from "./pages/index"
import { 
  AddJob,
  Profile,
  Stats,
  SharedLayout,
  AllJobs, Users  } from './pages/dashboard/index'
  import { useAppContext } from './context/appContext';
import { useEffect } from "react";
function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/"
     element={
      <ProtectedRoute>
      <SharedLayout/>
       </ProtectedRoute>  
    }>
      <Route index element={<Stats/>} />
      <Route path="add-job" element={<AddJob/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="all-jobs" element={< AllJobs/>} />
       <Route path="add-users" element={< Users/>}/>
    
    
    </Route>
    <Route path="/register" element={<Register/>} />
    <Route path="/forgot" element={<Forgot/>} />
    <Route path="/landing" element={ <Landing/>} />
    <Route path="/reset/:token" element={ <Reset/>} />
    <Route path="/gmail" element={ <Gmail/>} />
   
    <Route path="*" element={<Error/>} />
   
    </Routes>
    </BrowserRouter>
 
  );
}

export default App;
