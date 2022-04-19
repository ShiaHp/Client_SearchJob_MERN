
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Dashboard,Register,Landing,Error,ProtectedRoute,Reset,Forgot} from "./pages/index"
import { 
  AddJob,
  Profile,
  Stats,
  SharedLayout,
  AllJobs} from './pages/dashboard/index'
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
    </Route>
    <Route path="/register" element={<Register/>} />
    <Route path="/forgot" element={<Forgot/>} />
    <Route path="/landing" element={ <Landing/>} />
    <Route path="/reset/:token" element={ <Reset/>} />
    <Route path="*" element={<Error/>} />
   
    </Routes>
    </BrowserRouter>
 
  );
}

export default App;
