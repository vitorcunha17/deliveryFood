import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_ADICIONAL"
  }
}

const setAdicionais = (adicionais) => {
  return {
    type: "OBTER_ADICIONAIS",
    adicionais
  }
}

const erro = (erro) => {
  return {
    type: "ERRO_ADICIONAL",
    erro: erro.error,
    mensagem: erro.mensagem
  }
}

export const obterAdicionais = () => {
  return dispatch => {
    dispatch(requisitar());
    return axios.get(`${REQUEST_URL}/adicionais`).then((response) => {
      if(response.data.tipo==="erro"){
        dispatch(erro({erro: response.data.error, mensagem: response.data.mensagem}));
      }else{
        dispatch(setAdicionais(response.data));
      }
    });
  }
}
