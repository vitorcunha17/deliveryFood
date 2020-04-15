import {toast} from 'react-toastify';

const INITIAL_STATE = {
  todos: [],
  autenticado: null,
  carregando: false,
  especifico: {},
  erro: null,
  token: ""
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_USUARIO':
      return {...state, carregando: true};
    case 'AUTENTICOU':
      return {...state, carregando: false, autenticado: action.usuario, token: action.token, erro: null};
    case 'AUTENTICOU_COOKIE':
      return {...state, carregando: false, autenticado: action.usuario, erro: null};
    case 'ERRO_USUARIO':
      toast.error(action.erro.message, {autoClose: false});
      return {...state, carregando: false, erro: action.erro};
    case 'ERRO_AUTENTICACAO':
      toast.error("Login ou senha incorretos", 5000);
      return {...state, carregando: false};
    case 'LOGOUT':
      return {...state, autenticado: null, token: "", erro: null, carregando: false};
    case 'OBTER_TODOS_USUARIOS':
      return {...state, carregando: false, todos: action.usuarios, erro: null};
    case 'NOVO_USUARIO':
      toast.success("Usuário cadastrado com sucesso.", 5000);
      return {...state, carregando: false, todos: state.todos.concat(action.usuario), erro: null};
    case 'NOVO_USUARIO_FORMANDO':
      toast.success("Acesso para o formando "+action.usuario.nome+" criado com sucesso", 5000);
      return {...state, carregando: false, especifico: action.usuario, erro: null};
    case 'ALTERAR_USUARIO':
      toast.success("Usuário alterado com sucesso.", 5000);
      return {...state, carregando: false, todos: state.todos.filter((usuario) => {return usuario.id!==action.usuario.id}).concat(action.usuario), erro: null};
    case 'REMOVER_USUARIO':
      toast.success("Usuário removido com sucesso.", 5000);
      return {...state, carregando: false, todos: state.todos.filter((usuario) => {return usuario.id!==action.id}), erro: null};
    default:
      return state;
  }
};
