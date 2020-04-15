import {toast} from 'react-toastify';

const INITIAL_STATE = {
  todas: [],
  carregando: false,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_CATEGORIA':
      return {...state, carregando: true};
    case 'ERRO_CATEGORIA':
      toast.error(action.erro.menssagem, {autoClose: false});
      return {...state, carregando: false, erro: action.erro};
    case 'OBTER_CATEGORIAS':
      return {...state, carregando: false, todas: action.categorias, erro: null};
    case 'ADICIONAR_CATEGORIA':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todas: state.todas.concat(action.categoria), erro: null};
    case 'EDITAR_CATEGORIA':
      console.dir(action.ingrediente);
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todas: state.todas.filter((categoria) => {return categoria._id!==action.categoria._id}).concat(action.categoria), erro: null};
    case 'DELETAR_CATEGORIA':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todas: state.todas.filter((categoria) => {return categoria._id!==action._id}), erro: null};
    default:
      return state;
  }
};
