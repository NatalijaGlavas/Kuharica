import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"

import Autori from "./pages/autori/Autori"
import AutoriDodaj from "./pages/autori/AutoriDodaj"
import AutoriPromjeni from "./pages/autori/AutoriPromjeni"

import Recepti from "./pages/recepti/Recepti"
import ReceptiDodaj from "./pages/recepti/ReceptiDodaj"
import ReceptiPromjeni from "./pages/recepti/ReceptiPromjeni"







import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />

          
          <Route path={RoutesNames.AUTORI_PREGLED} element={<Autori />} />
          <Route path={RoutesNames.AUTORI_NOVI} element={<AutoriDodaj />} />
          <Route path={RoutesNames.AUTORI_PROMJENI} element={<AutoriPromjeni />} />


          <Route path={RoutesNames.RECEPTI_PREGLED} element={<Recepti />} />
          <Route path={RoutesNames.RECEPTI_NOVI} element={<ReceptiDodaj />} />
          <Route path={RoutesNames.RECEPTI_PROMJENI} element={<ReceptiPromjeni />} />


          

        </>
      </Routes>
    </>
  )
}

export default App
