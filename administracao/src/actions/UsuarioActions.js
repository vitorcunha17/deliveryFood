import axios from 'axios';
import {REQUEST_URL} from '../config/urls';

const requisitar = () => {
  return {
    type: "REQUISITAR_USUARIO"
  };
}

const autenticou = (resposta) => {
  return {
    type: "AUTENTICOU",
    usuario: resposta.usuario,
    //token: resposta.token.id
  }
}

const autenticouCookie = (usuario) => {
  return {
    type: "AUTENTICOU_COOKIE",
    usuario
  }
}

const erroAutenticacao = () => {
  return {
    type: "ERRO_AUTENTICACAO"
  }
}

const erro = (erro) => {
  if(erro.statusCode===401){
    axios.defaults.headers.common['Authorization'] = "";
    return {
      type: "LOGOUT"
    }
  }else{
    return {
      type: "ERRO_USUARIO",
      erro
    }
  }
}

const obterTodos = (usuarios) => {
  return {
    type: "OBTER_TODOS_USUARIOS",
    usuarios
  }
}

const novoUsuario = (usuario) => {
  return {
    type: "NOVO_USUARIO",
    usuario
  }
}

const alterarUsuario = (usuario) => {
  return {
    type: "ALTERAR_USUARIO",
    usuario
  }
}

const removerUsuario = (id) => {
  return {
    type: "REMOVER_USUARIO",
    id
  }
}

// FUNÇÕES EXPORTADAS

export const login = (credenciais) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/usuarios/login`, credenciais).then(response => {
      let resposta = response.data;
      //axios.defaults.headers.common['Authorization'] = resposta.token.id;
      //sessionStorage.setItem('token', resposta.token.id);
      sessionStorage.setItem('usuarioLogado', JSON.stringify(resposta.usuario));
      dispatch(autenticou(resposta));
    }).catch(error => {
      console.error(error);
      dispatch(erroAutenticacao(error));
    });
  }
}

export const setUsuario = (usuario) => {
  return dispatch => {
    dispatch(autenticouCookie(usuario));
  }
}

export const logout = () => {
  axios.defaults.headers.common['Authorization'] = "";
  sessionStorage.removeItem('usuarioLogado');
  return {
    type: "LOGOUT"
  }
}

export const adicionarUsuario = (usuario) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.post(`${REQUEST_URL}/usuarios`, usuario).then((response) => {
      dispatch(novoUsuario(response.data));
    }).catch(error => {
      dispatch(erro(error.response.data.error));
    });
  }
}

export const editarUsuario = (usuario, id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.patch(`${REQUEST_URL}/usuarios/${id}`, usuario).then((response) => {
      dispatch(alterarUsuario(response.data));
    }).catch(error => {
      dispatch(erro(error.response.data.error));
    });
  }
}

export const deletarUsuario = (id) => {
  return dispatch => {
    dispatch(requisitar());
    return axios.delete(`${REQUEST_URL}/usuarios/${id}`).then(() => {
      dispatch(removerUsuario(id));
    }).catch(error => {
      dispatch(erro(error.response.data.error));
    });
  }
}

export const obterUsuarios = () => {
  return dispatch => {
    dispatch(requisitar());
    return axios.get(`${REQUEST_URL}/usuarios`).then((response) => {
      dispatch(obterTodos(response.data.usuarios));
    }).catch(error => {
      dispatch(erro(error.response.data.error));
    });
  }
}
