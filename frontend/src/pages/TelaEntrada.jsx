import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { hookMesa } from "../context/MesaProvider";

const TelaEntrada = () => {
    const [mesaInput, setMesaInput] = useState('')
    
    const {salvarDado} = hookMesa();
    const navigate = useNavigate();

    const manipularEnvio = async(e) => {
        e.preventDefault();

        try{
            const resposta = await api.post('/mesas', {
                numeroMesa:mesaInput,
                estadoMesa:'aberto'

            });
            salvarDado(resposta.data);
            navigate('/cardapio')
        }catch (erro) {
            console.error('Falha ao enviar comanda', erro)
        }
    }

    return (
        <>
            <form onSubmit={manipularEnvio}>
                <input type="text"
                placeholder="Digite o numero da mesa:"
                value={mesaInput}
                onChange={(e) => setMesaInput(e.target.value)}/>

                <button type="submit">Avancar</button>
            </form>       
        </>
    )
};

export default TelaEntrada;