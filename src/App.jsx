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
import { quizeContext } from "./Context API/QuizeContext"
import { useContext } from "react"

function App() {
  const { loading } = useContext(quizeContext)

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/anonymous/:id" element={<TakeQuize />} />
        <Route path="/" element={<HomePage />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create-quize" element={<CreateQuize />} />
          <Route path="/edit-quize" element={<EditQuize />} />
          <Route path="/analytics/q-analysis" element={<QWiseAnalysis />} />
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
