const INITIAL_STATE = {
  sessao: null,
  carregando: false,
  transacao: null,
  erro: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REQUISITAR_PAGAMENTO':
      return {...state, carregando: true};
    case 'OBTER_SESSAO':
      return {...state, carregando: false, sessao: action.sessao};
    case 'PROCESSAR_PAGAMENTO':
      return {...state, carregando: false, transacao: action.transacao};
    default:
      return state;
  }
};
