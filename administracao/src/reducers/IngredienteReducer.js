import {toast} from 'react-toastify';

const INITIAL_STATE = {
  todos: [],
  carregando: false,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_INGREDIENTE':
      return {...state, carregando: true};
    case 'ERRO_INGREDIENTE':
      toast.error(action.erro.menssagem, {autoClose: false});
      return {...state, carregando: false, erro: action.erro};
    case 'OBTER_INGREDIENTES':
      return {...state, carregando: false, todos: action.ingredientes, erro: null};
    case 'ADICIONAR_INGREDIENTE':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todos: state.todos.concat(action.ingrediente), erro: null};
    case 'EDITAR_INGREDIENTE':
      console.dir(action.ingrediente);
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todos: state.todos.filter((ingrediente) => {return ingrediente._id!==action.ingrediente._id}).concat(action.ingrediente), erro: null};
    case 'DELETAR_INGREDIENTE':
      toast.success(action.mensagem, 5000);
      return {...state, carregando: false, todos: state.todos.filter((ingrediente) => {return ingrediente._id!==action._id}), erro: null};
    default:
      return state;
  }
};
