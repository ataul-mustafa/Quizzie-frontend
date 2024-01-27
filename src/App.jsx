import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import CreateQuize from "./pages/CreateQuize"
import Loader from "./utils/globalLoader/Loader"
import TakeQuize from "./pages/TakeQuize"
import EditQuize from "./pages/EditQuize"
import QWiseAnalysis from "./pages/QWiseAnalysis"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/anonymous/:id" element={<TakeQuize />} />
        <Route path="/" element={<HomePage />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create-quize" element={<CreateQuize />} />
          <Route path="/analytics/edit-quize/:id" element={<EditQuize />} />
          <Route path="/analytics/q-analysis/:id" element={<QWiseAnalysis />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
      />
    </>
  )
}

export default App
