const INITIAL_STATE = {
  venda: null,
  pedido: {
    itens: [],
    total: 0,
    encomenda: false
  },
  mensagem: "",
  carregando: false,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_VENDA':
      return {...state, carregando: true};
    case 'SALVAR_VENDA':
      return {...state, carregando: false, venda: action.venda};
    case 'ADICIONAR_COMIDA':
      return {...state, pedido: {...state.pedido, total: state.pedido.total + action.comida.total, itens: state.pedido.itens.concat(action.comida)}};
    case 'REMOVER_COMIDA':
      return {...state, pedido: {...state.pedido, total: state.pedido.total - action.comida.total, itens: state.pedido.itens.filter(item => item!==action.comida)}};
    case 'ENCOMENDA':
      return {...state, pedido: {...state.pedido, encomenda: action.encomenda}};
    case 'EDITAR_VENDA':
      return {...state, carregando: false, venda: action.venda, mensagem: action.mensagem};
    default:
      return state;
  }
};
