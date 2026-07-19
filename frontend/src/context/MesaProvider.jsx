import { useContext, createContext, useState } from "react";

const AuthMesa = createContext();

const MesaProvider = ({children}) => {
    const [estadoAtivo, setEstadoAtivo] = useState(() => {
        const salva = localStorage.getItem('@Comanda:mesa')
        return salva ? JSON.parse(salva) : null;
    });

    const salvarDado = (mesa) => {
        setEstadoAtivo(mesa);
        localStorage.setItem('@Comanda:mesa',
        JSON.stringify(mesa));
    };

    const limparDado = () => {
        setEstadoAtivo(null);
        localStorage.removeItem('@Comanda:mesa')
    }

    return(
        <AuthMesa.Provider value={{estadoAtivo, salvarDado, limparDado}}>
        {children}
        </AuthMesa.Provider>
    )
};

export default MesaProvider;
export const hookMesa = () => useContext(AuthMesa);