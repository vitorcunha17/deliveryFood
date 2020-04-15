import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_PAGAMENTO"
  }
}

const processarTransacao = (transacao) => {
  return {
    type: "PROCESSAR_PAGAMENTO",
    transacao
  }
}


export const processarPagamento = (pagamento) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/transacoes`, pagamento).then((response) => {
      window.location.href = response.data.body.init_point;
    }).catch(error => {

    });
  }
}
