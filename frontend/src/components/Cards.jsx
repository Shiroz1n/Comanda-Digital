const Cards = ({ preco, nome, imagem, descricao, botao }) => {
  return (
    <>
      <div>
        <div>
          <h3>{nome}</h3>
        </div>
        <div>
          <p>{preco}</p>
        </div>
        <div>
          <img src={imagem} alt="" />
        </div>
        <div>
          <button className="cursor-pointer" onClick={botao}>Adicionar</button>
        </div>
      </div>
    </>
  );
};

export default Cards;
