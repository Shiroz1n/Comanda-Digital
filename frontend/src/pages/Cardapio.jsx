import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Cards from "../components/Cards";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

const Cardapio = () => {
  const [cardapio, setCardapio] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carregarCardapio = async () => {
      try {
        const resposta = await api.get("/cardapio");
        setLoading(false);

        setCardapio(resposta.data);
      } catch (err) {
        console.error("Erro capturado pelo axios");
        setErro("Cardapio nao carregado");
      }
    };
    carregarCardapio();
    console.log("Funcionando");
  }, []);

  const valorTotal = useMemo(()=> {
    return carrinho.reduce((soma, item)=> soma + (item.preco * item.qtd), 0);
  }, [carrinho])

  const adicionarAoCarrinho = (produtoNovo) => {
    setCarrinho((prev) => {
      const existe = prev.find(
        (item) => item.idProduto === produtoNovo.idProduto,
      );
      if (existe) {
        return prev.map((item) =>
          item.idProduto === produtoNovo.idProduto
            ? { ...item, qtd: item.qtd + 1 }
            : item,
        );
      }
      return [...prev, { ...produtoNovo, qtd: 1 }];
    });
  };


  return (
    <>
      <div>
        <Tabs defaultValue="Lanches">
          <TabsList variant="line">
            <TabsTrigger value="Lanches">LANCHES</TabsTrigger>
            <TabsTrigger value="Bebidas">BEBIDAS</TabsTrigger>
            <TabsTrigger value="Porções">PORÇÕES</TabsTrigger>
          </TabsList>
          <TabsContent value="Lanches">
            {cardapio
              .filter((item) => item.categoria === "Lanches")
              .map((item) => {
                return (
                  <Cards
                    key={item.idProduto}
                    nome={item.nomeProduto}
                    preco={item.preco}
                    imagem={item.imagem}
                    botao={() => adicionarAoCarrinho(item)}
                  ></Cards>
                );
              })}
          </TabsContent>
          <TabsContent value="Bebidas">
            {cardapio
              .filter((item) => item.categoria === "Bebidas")
              .map((item) => {
                return (
                  <Cards
                    key={item.idProduto}
                    nome={item.nomeProduto}
                    preco={item.preco}
                    imagem={item.imagem}
                  ></Cards>
                );
              })}
          </TabsContent>
          <TabsContent value="Porções">
            {cardapio
              .filter((item) => item.categoria === "Porções")
              .map((item) => {
                return (
                  <Cards
                    key={item.idProduto}
                    nome={item.nomeProduto}
                    preco={item.preco}
                    imagem={item.imagem}
                  ></Cards>
                );
              })}
          </TabsContent>
        </Tabs>
        <Sheet>
          <SheetTrigger
            render={
              <Button className="fixed z-50 bottom-5 right-6 cursor-pointer">
                <ShoppingCart></ShoppingCart> SUA COMANDA
              </Button>
            }
          ></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>This action cannot be undone.</SheetDescription>
              <div className="overflow-y-auto max-w">
                {carrinho.map((item) => (
                  <div key={item.idProduto} className="flex">
                    <img src={item.imagem} alt="" className=" h-1 w-1" />
                    <div>
                      <p>{item.nomeProduto}</p>
                      <span>{item.qtd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SheetHeader>
            <SheetFooter className="border-t w-full font-bold">
              <div className="flex justify-between px-2 w-full">
                <span>Total do pedido: </span>
                <span className="text-emerald-600">R${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <Button className="cursor-pointer">
                Enviar pedido para a cozinha
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Cardapio;
