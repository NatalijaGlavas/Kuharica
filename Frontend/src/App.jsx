import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Autori from "./pages/autori/Autori"

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AutoriDodaj from "./pages/autori/AutoriDodaj"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          <Route path={RoutesNames.AUTORI_PREGLED} element={<Autori />} />
          <Route path={RoutesNames.AUTORI_NOVI} element={<AutoriDodaj />} />
        </>
      </Routes>
    </>
  )
}

export default App
