import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_CATEGORIA"
  }
}

const erro = (erro) => {
  return {
    type: "ERRO_CATEGORIA",
    erro
  }
}

export const adicionarCategoria = (categoria) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/categorias`, categoria).then((response) => {
      dispatch({
        type: "ADICIONAR_CATEGORIA",
        mensagem: response.data.mensagem,
        categoria: response.data.categoria
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const deletarCategoria = (id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.delete(`${REQUEST_URL}/categorias/${id}`).then((response) => {
      dispatch({
        type: "DELETAR_CATEGORIA",
        mensagem: response.data.mensagem,
        _id: id
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}

export const obterCategorias = () => {
  return dispatch => {
    dispatch(requisitar());
    return axios.get(`${REQUEST_URL}/categorias`).then((response) => {
      dispatch({
        type: "OBTER_CATEGORIAS",
        categorias: response.data.categorias
      });
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}
