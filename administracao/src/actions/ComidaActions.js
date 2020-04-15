import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_COMIDA"
  }
}

const erro = (erro) => {
  return {
    type: "ERRO_COMIDA",
    erro
  }
}

export const obterComidas = () => {
  return dispatch => {
    dispatch(requisitar());
    return axios.get(`${REQUEST_URL}/comidas`).then((response) => {
      dispatch({
        type: "OBTER_COMIDAS",
        comidas: response.data.comidas
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const adicionarComida = (comida) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/comidas`, comida).then((response) => {
      dispatch({
        type: "ADICIONAR_COMIDA",
        mensagem: response.data.mensagem,
        comida: response.data.comida
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const deletarComida = (id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.delete(`${REQUEST_URL}/comidas/${id}`).then((response) => {
      dispatch({
        type: "DELETAR_COMIDA",
        mensagem: response.data.mensagem,
        _id: id
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const editarComida = (comida, id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.patch(`${REQUEST_URL}/comidas/${id}`, comida).then((response) => {
      dispatch({
        type: "EDITAR_COMIDA",
        mensagem: response.data.mensagem,
        comida: response.data.comida
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}
