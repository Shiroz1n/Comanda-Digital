import { useEffect, useState } from "react";
import api from "../services/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Cards from "../components/Cards";

const Cardapio = () => {
    const [cardapio, setCardapio] = useState([]);
    const [erro ,setErro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarCardapio = async() => {
            try{
                const resposta = await api.get('/cardapio');
                setLoading(false);
                
                setCardapio(resposta.data);
            } catch (err) {
                console.error('Erro capturado pelo axios')
                setErro('Cardapio nao carregado')
            }
        };
        carregarCardapio();
        console.log('Funcionando')
    }, []);


    return(
        <>
        <Tabs defaultValue="overview">
            <TabsList variant="line">
                <TabsTrigger value="Lanches">LANCHES</TabsTrigger>
                <TabsTrigger value="Bebidas">BEBIDAS</TabsTrigger>
                <TabsTrigger value="Porções">PORÇÕES</TabsTrigger>
            </TabsList>

            <TabsContent value='Lanches'>
                {cardapio.filter(item => item.categoria === 'Lanches').map((item)=> {
                    return(
                        <Cards key={item.idProduto} nome={item.nomeProduto} preco={item.preco} imagem={item.imagem}>

                        </Cards>
                    )
                })}
            </TabsContent>

            <TabsContent value='Bebidas'>
                {cardapio.filter(item => item.categoria === 'Bebidas').map((item) => {
                    return(
                        <Cards key={item.idProduto} nome={item.nomeProduto} preco={item.preco} imagem={item.imagem}></Cards>
                    )
                })}
            </TabsContent>

            <TabsContent value='Porções'>
                {cardapio.filter(item => item.categoria === 'Porções').map((item)=> {
                    return(
                        <Cards key={item.idProduto} nome={item.nomeProduto} preco={item.preco} imagem={item.imagem}></Cards>
                    )
                })}
            </TabsContent>
        </Tabs>
        </>
    )
};

export default Cardapio;