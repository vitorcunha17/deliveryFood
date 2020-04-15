import {toast} from 'react-toastify';

const INITIAL_STATE = {
  todas: [],
  carregando: false,
  erro: null,
  venda: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_VENDA':
      return {...state, carregando: true};
    case 'OBTER_VENDAS':
      return {...state, carregando: false, todas: action.vendas};
    case 'EDITAR_VENDA':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, venda: action.venda};
    case 'ERRO_VENDA':
      return {...state, carregando: false, erro: action.erro};
    default:
      return state;
  }
};
