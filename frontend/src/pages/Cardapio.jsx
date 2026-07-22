import { useEffect, useState } from "react";
import api from "../services/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Cards from "../components/Cards";
import { Button } from "@base-ui/react";
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

  return (
    <>
      <div>
        <Tabs defaultValue="overview">
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
              <Button className="fixed z-50 bottom-5 right-6 cursor-pointer"></Button>
            }
          >
            {" "}
            <ShoppingCart></ShoppingCart> SUA COMANDA
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>This action cannot be undone.</SheetDescription>
              <div className="overflow-y-auto">

              </div>
            </SheetHeader>
            <SheetFooter border-t w-full>
              <div className="flex justify-between px-2">
                <span>Total do pedido: </span>
                <span className="text-emerald-600">R$</span>
              </div>
              <Button className='cursor-pointer'></Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Cardapio;
