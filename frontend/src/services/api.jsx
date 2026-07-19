import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
});

api.interceptors.request.use(
    (config) => {
        const mesaSalva = localStorage.getItem('@Comanda:mesa');
        if(mesaSalva) {
            const dadosMesa = JSON.parse(mesaSalva)
            config.headers[X-Mesa-Identificador]
        }
        return config;
    },
    (erro) => {
        return Promise.reject(erro)
    }
);

export default api;