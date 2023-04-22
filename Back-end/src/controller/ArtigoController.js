const Artigo = require('../models/Artigo')
const Categoria = require('../models/Categoria')
const SubArtigo = require('../models/SubArtigo')

module.exports = {
  async ListarArtigos(req, res) {
    try {
      const artigos = await Artigo.findAll({ include: [Categoria, SubArtigo] })

      if (!artigos) res.status(204).json({ mensagem: 'Não existem artigos salvos' })
      else res.status(200).json({ artigos })
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async ListarUmArtigo(req, res) {
    try {
      const { slug } = req.params

      const artigos = await Artigo.findOne({
        where: { slug },
        include: [Categoria, SubArtigo]
      })

      if (!artigos) res.status(400).json({ mensagem: 'O artigo não existe' })
      else res.status(200).json({ artigos })
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async CriarArtigo(req, res) {
    try {
      const { titulo, categoria, conteudo } = req.body

      if (!titulo || !categoria || !conteudo) res.status(400).json({ mensagem: 'ERRO: Algum dos campos está vazio' })
      else {
        const artigo = await Artigo.findOne({ where: { titulo } })
        const subArtigo = await SubArtigo.findOne({ where: { titulo } })

        if (artigo || subArtigo) {
          res.status(400).json({ mensagem: 'ERRO: Já existe um artigo com esse titulo' })
        } else {
          const findCategoria = await Categoria.findOne({ where: { categoria } })
          const categoriaid = findCategoria.id

          const slug = titulo.replace(/\s/, '-')

          const artigo = await Artigo.create({ titulo, conteudo, slug, categoriaid })

          res.status(201).json({
            mensagem: 'Artigo criado com sucesso',
            artigo
          })
        }
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async AtualizarArtigo(req, res) {
    try {
      const { slug } = req.params
      const { titulo, categoria, conteudo } = req.body

      if (!slug) res.status(400).json({ mensagem: 'ERRO: O título não foi especificado como parametro' })
      else {
        if (!titulo || !categoria || !conteudo) res.status(400).json({ mensagem: 'ERRO: Algum dos campos está vazio' })
        else {
          const findArtigo = await Artigo.findOne({ where: { slug } })
          const categoriaid = await Categoria.findOne({ where: { categoria } }).id

          if (!findArtigo) res.status(400).json({ mensagem: 'ERRO: O artigo não foi encontrado' })
          else {
            const slug = titulo.split(' ').join('-')

            await Artigo.update({
              titulo: titulo,
              categoriaid,
              conteudo: conteudo,
              slug: slug
            }, { where: { slug } })

            res.status(204).json({ mensagem: 'O artigo foi atualizado com sucesso' })
          }
        }
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  async DeletarArtigo(req, res) {
    try {
      const { slug } = req.params

      if (!slug) res.status(400).json({ mensagem: 'ERRO: O título não foi especificado como parametro' })
      else {
        const findArtigo = Artigo.findOne({ where: { slug } })

        if (!findArtigo) res.status(400).json({ mensagem: 'ERRO: O artigo não foi encontrado' })
        else {
          await Artigo.destroy({ where: { slug } })

          res.status(204).json({ mensagem: 'Artigo deletado com sucesso' })
        }
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}