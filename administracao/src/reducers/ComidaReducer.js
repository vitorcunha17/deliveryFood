import {toast} from 'react-toastify';

const INITIAL_STATE = {
  todas: [],
  carregando: false,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_COMIDA':
      return {...state, carregando: true};
    case 'ERRO_COMIDA':
      toast.error(action.erro.menssagem, {autoClose: false});
      return {...state, carregando: false, erro: action.erro};
    case 'OBTER_COMIDAS':
      return {...state, carregando: false, todas: action.comidas, erro: null};
    case 'ADICIONAR_COMIDA':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todas: state.todas.concat(action.comida), erro: null};
    case 'EDITAR_COMIDA':
      console.dir(action.ingrediente);
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todas: state.todas.filter((comida) => {return comida._id!==action.comida._id}).concat(action.comida), erro: null};
    case 'DELETAR_COMIDA':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todas: state.todas.filter((comida) => {return comida._id!==action._id}), erro: null};
    default:
      return state;
  }
};
