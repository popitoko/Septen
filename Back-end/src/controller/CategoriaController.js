const Artigo = require("../models/Artigo")
const Categoria = require("../models/Categoria")
const SubArtigo = require("../models/SubArtigo")

module.exports = {
  async ListarCategorias(req, res) {
    try {
      const categorias = await Categoria.findAll({
        include: {
          model: Artigo,
          include: [SubArtigo]
        }
      })

      if (!categorias) res.status(204).json({ mensagem: 'Não há categorias salvas' })
      else res.status(200).json({ categorias })

    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async CriarCategoria(req, res) {
    try {
      const { categoria } = req.body

      if (!categoria) res.status(400).json({ mensagem: 'ERRO: Você deve escrever o nome da categoria' })
      else {
        const findCategoria = await Categoria.findOne({ where: { categoria } })

        if (findCategoria) res.status(400).json({ mensagem: 'ERRO: Essa categoria já existe' })
        else {
          const novaCategoria = await Categoria.create({ categoria })

          res.status(201).json({
            mensagem: 'Categoria criada com sucesso',
            novaCategoria
          })
        }
      }

    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async AtualizarCategoria(req, res) {
    try {
      const { Categoria } = req.params
      const { categoria } = req.body

      if (!categoria) res.status(400).json({ mensagem: 'ERRO: Você deve escrever o nome da categoria' })
      else {
        const findCategoria = await Categoria.findOne({ where: { categoria } })

        if (findCategoria) res.status(400).json({ mensagem: 'ERRO: Essa categoria já existe' })
        else {
          await Categoria.update({ categoria }, { where: { categoria: Categoria } })

          res.status(204).json({ mensagem: 'A categoria foi atualizada com sucesso' })
        }
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async DeletarCategoria(req, res) {
    try {
      const { categoria } = req.params

      if (!categoria) res.status(401).json({ mensagem: 'ERRO: você deve escrever o nome da categoria' })
      else {
        await Categoria.destroy({ where: { categoria } })
        res.status(204).json({ mensagem: 'Categoria deletada com sucesso' })
      }
    } catch(error) {
    res.status(400).json({ error })
  }
}
}