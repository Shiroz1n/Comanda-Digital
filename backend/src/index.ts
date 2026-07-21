import {Elysia, t} from "elysia";
import cors from "@elysiajs/cors";
import {Database} from 'bun:sqlite'

const db = new Database('./database/Restaurande.db')

db.query(`
    CREATE TABLE IF NOT EXISTS mesas (
        numeroMesa INTEGER PRIMARY KEY,
        estadoMesa TEXT DEFAULT 'aberto'
    )  
`).run();

db.query(`
    CREATE TABLE IF NOT EXISTS produtos (
        idProduto INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeProduto TEXT NOT NULL,
        categoria TEXT NOT NULL,
        preco REAL NOT NULL,
        imagem TEXT NOT NULL
    )    
`).run();

db.query(`
    CREATE TABLE IF NOT EXISTS pedidos (
        idPedido INTEGER PRIMARY KEY AUTOINCREMENT,
        total REAL NOT NULL,
        numeroMesa INTEGER NOT NULL,
        horario INTEGER DEFAULT CURRENT_TIMESTAMP
    )
`).run();

const checarBanco = db.query("SELECT COUNT(*) as total FROM produtos").get() as { total: number };

if (checarBanco.total === 0) {
    console.log("⚡ Banco de dados vazio! Populando cardápio e mesas automaticamente...");

    // Inserindo as 20 mesas de forma rápida
    for (let i = 1; i <= 20; i++) {
        db.query(`INSERT OR IGNORE INTO mesas (numeroMesa, estadoMesa) VALUES (?, 'aberto')`).run(i);
    }

    // Preparando a fôrma para inserir os produtos
    const insertProduto = db.prepare(`
        INSERT INTO produtos (nomeProduto, categoria, preco, imagem) 
        VALUES (?, ?, ?, ?)
    `);

    // Categoria: Lanches
    insertProduto.run('X-Burger Clássico', 'Lanches', 22.00, 'x-burger.png');
    insertProduto.run('X-Salada Especial', 'Lanches', 25.50, 'x-salada.png');
    insertProduto.run('X-Bacon Supremo', 'Lanches', 29.90, 'x-bacon.png');
    insertProduto.run('Double Cheddar Burger', 'Lanches', 34.00, 'double-cheddar.png');
    insertProduto.run('Monster Burger Artesanal', 'Lanches', 38.90, 'monster.png');
    insertProduto.run('Chicken Burger Crocante', 'Lanches', 24.00, 'chicken.png');
    insertProduto.run('X-Egg Bacon', 'Lanches', 28.00, 'x-egg.png');
    insertProduto.run('Burger Veggie', 'Lanches', 27.00, 'veggie.png');

    // Categoria: Porções
    insertProduto.run('Batata Frita Simples', 'Porções', 16.00, 'fritas.png');
    insertProduto.run('Batata com Cheddar e Bacon', 'Porções', 26.90, 'fritas-cheddar.png');
    insertProduto.run('Anéis de Cebola Crocantes', 'Porções', 18.50, 'onion-rings.png');
    insertProduto.run('Nuggets de Frango (10 un)', 'Porções', 22.00, 'nuggets.png');

    // Categoria: Bebidas
    insertProduto.run('Coca-Cola Lata 350ml', 'Bebidas', 6.50, 'coca-lata.png');
    insertProduto.run('Guaraná Antarctica Lata', 'Bebidas', 6.00, 'guarana.png');
    insertProduto.run('Coca-Cola 2 Litros', 'Bebidas', 14.00, 'coca-2l.png');
    insertProduto.run('Suco de Laranja 500ml', 'Bebidas', 9.00, 'suco-laranja.png');
    insertProduto.run('Água Mineral Sem Gás', 'Bebidas', 4.50, 'agua.png');

    console.log("✅ Banco de dados populado com sucesso!");
}


const app = new Elysia()
.use(cors())
.post('/api/mesas', ({body, set})=> {
    const {numeroMesa, estadoMesa} = body;
    
    const registroEncontrado = db.query(
        'SELECT numeroMesa, estadoMesa FROM mesas WHERE numeroMesa = ?'
    ).get(numeroMesa)as {numeroMesa:number; estadoMesa:string} | null

    if (registroEncontrado) {
        return registroEncontrado;
    }else {
        db.query(`
            INSERT INTO mesas (numeroMesa, estadoMesa) VALUES (?, ?)
        `).run(numeroMesa, 'aberto')
        return { numeroMesa: Number(numeroMesa), estadoMesa:'aberto'}
    }
}, {
    body: t.Object({
        numeroMesa: t.String(),
        estadoMesa: t.String()
    })
})

.get('/api/cardapio', () => {
    return db.query('SELECT * FROM produtos').all();
})

.listen(3000)

console.log('Elysia ativo')
