import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const erro = (error) => {
  return {
    type: "ERRO_VENDA",
    erro: error
  }
}

const requisitar = () => {
  return {
    type: "REQUISITAR_VENDA"
  }
}

export const obterVendas = () => {
  return dispatch => {
    dispatch(requisitar());
    return axios.get(`${REQUEST_URL}/vendas`).then((response) => {
      dispatch({
        type: "OBTER_VENDAS",
        vendas: response.data.vendas
      });
    }).catch(error => {
      dispatch(erro(error));
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
