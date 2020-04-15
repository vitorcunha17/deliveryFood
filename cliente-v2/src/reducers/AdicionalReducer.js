const INITIAL_STATE = {
  todos: [],
  mensagem: null,
  carregando: false,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_ADICIONAL':
      return {...state, carregando: true};
    case 'ERRO_ADICIONAL':
      return {...state, carregando: false, erro: action.erro, mensagem: action.mensagem};
    case 'OBTER_ADICIONAIS':
      return {...state, carregando: false, todos: action.adicionais};
    default:
      return state;
  }
};
