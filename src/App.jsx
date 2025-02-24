import React from "react";
import NotFound from './components/NotFound'
import Peliculas from './components/Peliculas/Peliculas'
import Reservaciones from './components/Reservaciones/Reservaciones'
import Salas from './components/Salas/Salas'
import Menu from './components/Menu'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Menu />} />
        <Route exact path='/peliculas' element={<Peliculas />} />
        <Route exact path='/reservas' element={<Reservaciones />} />
        <Route exact path='/salas' element={<Salas />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App