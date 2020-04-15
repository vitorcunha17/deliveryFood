import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_INGREDIENTE"
  }
}

const erro = (erro) => {
  return {
    type: "ERRO_INGREDIENTE",
    erro
  }
}

export const obterIngredientes = () => {
  return dispatch => {
    dispatch(requisitar());
    return axios.get(`${REQUEST_URL}/ingredientes`).then((response) => {
      dispatch({
        type: "OBTER_INGREDIENTES",
        ingredientes: response.data.ingredientes
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const adicionarIngrediente = (ingrediente) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/ingredientes`, ingrediente).then((response) => {
      dispatch({
        type: "ADICIONAR_INGREDIENTE",
        ingrediente: response.data.ingrediente,
        mensagem: response.data.mensagem
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const editarIngrediente = (ingrediente, id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.patch(`${REQUEST_URL}/ingredientes/${id}`, ingrediente).then((response) => {
      dispatch({
        type: "EDITAR_INGREDIENTE",
        ingrediente: response.data.ingrediente,
        mensagem: response.data.mensagem
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const deletarIngrediente = (id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.delete(`${REQUEST_URL}/ingredientes/${id}`).then((response) => {
      dispatch({
        type: "DELETAR_INGREDIENTE",
        mensagem: response.data.mensagem,
        _id: id
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}
