import { Route, Routes, BrowserRouter } from "react-router-dom";
import MesaProvider from "./context/MesaProvider";
import TelaEntrada from "./pages/TelaEntrada";
import Cardapio from "./pages/Cardapio";

const App = () => {
  return(
    <BrowserRouter>
    

    <MesaProvider>
      <Routes>
      <Route path="/" element={<TelaEntrada />}/>
      <Route path="/cardapio" element={<Cardapio />}></Route>
      </Routes>
    </MesaProvider>
    </BrowserRouter>
  )
};

export default App;