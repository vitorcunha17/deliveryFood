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
      })
    }).catch(error => {
      dispatch(erro(error));
    });
  }
}
