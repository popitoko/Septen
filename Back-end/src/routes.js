const router = require('express').Router()

const ArtigoController = require('./controller/ArtigoController')
const CategoriaController = require('./controller/CategoriaController')
const JWT = require('./controller/JWT')
const SubArtigoController = require('./controller/SubArtigoController')
const UsuárioController = require('./controller/UsuárioController')

router.get('/api/artigos', ArtigoController.ListarArtigos)
router.get('/api/artigos/:slug', JWT.verifyJWT, ArtigoController.ListarUmArtigo)
router.post('/api/artigos', JWT.verifyJWT, ArtigoController.CriarArtigo)
router.put('/api/artigos/:slug', JWT.verifyJWT, ArtigoController.AtualizarArtigo)
router.delete('/api/artigos/:slug', JWT.verifyJWT, ArtigoController.DeletarArtigo)

router.get('/api/categorias', CategoriaController.ListarCategorias)
router.post('/api/categorias', JWT.verifyJWT, CategoriaController.CriarCategoria)
router.put('/api/categorias/:Categoria', JWT.verifyJWT, CategoriaController.AtualizarCategoria)
router.delete('/api/categorias/:categoria', JWT.verifyJWT, CategoriaController.DeletarCategoria)

router.get('/api/sub-artigos/:slug', JWT.verifyJWT, SubArtigoController.ListarUmSubArtigo)
router.post('/api/sub-artigos', JWT.verifyJWT, SubArtigoController.CriarSubArtigo)
router.put('/api/sub-artigos/:slug', JWT.verifyJWT, SubArtigoController.AtualizarSubArtigo)
router.delete('/api/sub-artigos/:slug', JWT.verifyJWT, SubArtigoController.DeletarSubArtigo)

router.get('/api/usuarios', JWT.verifyJWT, UsuárioController.ListarUsuários)
router.post('/api/usuarios/logar', UsuárioController.LogarUsuário)
router.post('/api/usuarios', JWT.verifyJWT, UsuárioController.CadastrarUsuário)

module.exports = router