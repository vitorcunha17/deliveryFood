import {combineReducers} from 'redux';
import ComidaReducer from './ComidaReducer';
import AdicionalReducer from './AdicionalReducer';
import PagamentoReducer from './PagamentoReducer';
import VendaReducer from './VendaReducer';

export default combineReducers({
  comida: ComidaReducer,
  adicional: AdicionalReducer,
  venda: VendaReducer,
  pagamento: PagamentoReducer
});
