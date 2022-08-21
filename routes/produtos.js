const express = require("express");
const router = express.Router();
const login = require("../middleware/login");

//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let data = new Date().toISOString().replace(/:/g, "-") + "-";
    cb(null, data + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const ProdutosController = require("../controllers/produtos-controller");

//------------------------------ROTAS

router.get("/", ProdutosController.getProdutos);

router.get("/:id_produto", ProdutosController.getProdutoId);

router.post(
  "/",
  login.obrigatorio,
  upload.single("produto_imagem"),
  ProdutosController.postProduto
);

router.patch(
  "/:id_produto",
  login.obrigatorio,
  ProdutosController.patchProduto
);

router.delete(
  "/:id_produto",
  login.obrigatorio,
  ProdutosController.deleteProduto
);

module.exports = router;
