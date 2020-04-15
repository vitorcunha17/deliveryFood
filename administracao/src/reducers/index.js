import {combineReducers} from 'redux';
import UsuarioReducer from './UsuarioReducer';
import VendaReducer from './VendaReducer';
import IngredienteReducer from './IngredienteReducer';
import CategoriaReducer from './CategoriaReducer';
import ComidaReducer from './ComidaReducer';

export default combineReducers({
  usuario: UsuarioReducer,
  venda: VendaReducer,
  ingrediente: IngredienteReducer,
  categoria: CategoriaReducer,
  comida: ComidaReducer
});
