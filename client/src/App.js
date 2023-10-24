import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import BugDashboard from './views/BugDashboard';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>hello root</div>} />
        <Route path="/hello" element={<div>componenta 2</div>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/bugs-overview" element={<BugDashboard/>}/>
      </Routes>
    </BrowserRouter>

  )
};

export default App;