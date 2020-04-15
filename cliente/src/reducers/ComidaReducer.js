const INITIAL_STATE = {
  todas: [],
  mensagem: null,
  carregando: false,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_COMIDA':
      return {...state, carregando: true};
    case 'ERRO_COMIDA':
      return {...state, carregando: false, erro: action.erro, mensagem: action.mensagem};
    case 'OBTER_COMIDAS':
      return {...state, carregando: false, todas: action.comidas};
    default:
      return state;
  }
};
