import express from "express"; // Importa o framework Express para criar aplicações web

import multer from "multer"; // Importa a biblioteca Multer para lidar com uploads de arquivos

import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Configura o armazenamento para arquivos enviados (imagens)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o destino para salvar os arquivos enviados
    cb(null, "uploads/"); // Define a pasta "uploads/" como destino para os uploads
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo salvo
    cb(null, file.originalname); // Usa o nome original do arquivo enviado
  },
});

// Cria uma instância do Multer com a configuração de armazenamento definida acima
const upload = multer({ dest: "./uploads", storage });

// Caso seu sistema operacional seja Linux ou macOS, você pode usar esta configuração alternativa:
// const upload = multer({ dest: "./uploads" , storage})

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor interprete dados enviados no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota para obter todos os posts (método GET)
  app.get("/posts", listarPosts); // Chama a função listarPosts para lidar com essa rota

  // Rota para criar um novo post (método POST)
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost para lidar com essa rota

  // Rota para realizar upload de imagens (método POST)
  app.post("/upload", upload.single("imagem"), uploadImagem); //Chama a função controladora para processamento da imagem.

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função de rotas como padrão para ser utilizada em outros arquivos
export default routes;
