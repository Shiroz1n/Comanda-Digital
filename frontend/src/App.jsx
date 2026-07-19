import { Route, Routes, BrowserRouter } from "react-router-dom";
import MesaProvider from "./context/MesaProvider";
import TelaEntrada from "./pages/TelaEntrada";

const App = () => {
  return(
    <BrowserRouter>
    

    <MesaProvider>
      <Routes>
      <Route path="/" element={<TelaEntrada />}/>
      </Routes>
    </MesaProvider>
    </BrowserRouter>
  )
};

export default App;