
const Cards = ({preco, nome, imagem, descricao}) => {

    return(
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
            </div>
        </>
    )
};

export default Cards;