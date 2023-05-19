import Produto from './Produto'

export default interface Carrinho {
    produto: Produto | null,
    quantidade: number
  }
  