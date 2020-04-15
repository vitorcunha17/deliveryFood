import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_VENDA"
  }
}

const erro = (erro) => {
  return {
    type: "ERRO_VENDA",
    erro: erro.error,
    mensagem: erro.mensagem
  }
}

const salvar = (venda) => {
  return {
    type: "SALVAR_VENDA",
    venda
  }
}

export const salvarVenda = (venda) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/vendas`, venda).then((response) => {
      if(response.data.tipo==="erro"){
        dispatch(erro({erro: response.data.error, mensagem: response.data.mensagem}));
      }else{
        dispatch(salvar(response.data.venda));
      }
    });
  }
}

export const editarVenda = (venda, id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.patch(`${REQUEST_URL}/vendas/${id}`, venda).then((response) => {
      dispatch({
        type: "EDITAR_VENDA",
        mensagem: response.data.mensagem,
        venda: response.data.venda
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const adicionarComida = (comida) => {
  return dispatch => {
    dispatch({
      type: "ADICIONAR_COMIDA",
      comida
    });
  }
}

export const removerComida = (comida) => {
  return dispatch => {
    dispatch({
      type: "REMOVER_COMIDA",

      comida
    });
  }
}

export const encomenda = (encomenda) => {
  return dispatch => {
    dispatch({
      type: "ENCOMENDA",
      encomenda
    });
  }
}
