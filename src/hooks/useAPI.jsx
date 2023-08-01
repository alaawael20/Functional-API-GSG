import axios from 'axios';
import { useReducer } from 'react';

const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const GET_SINGLE = 'GET_SINGLE';

const INITIAL_STATE = {
  stores: [],
  isLoading: false,
  error: null,
  store: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET:
      return {
        ...state,
        stores: action.payload,
        isLoading: false
      };
    case POST:
      return {
        ...state,
        stores: [
          ...state.stores,
          action.payload
        ],
        isLoading: false,
      };
    case DELETE:
      return {
        ...state,
        stores: state.stores.filter((store) => store.id !== action.payload),
        isLoading: false,
      };
    case EDIT:
      return {
        ...state,
        stores: state.stores.map((store) =>
          store.id === action.payload.id ? action.payload : store
        ),
        isLoading: false,
      };
    case GET_SINGLE:
      return {
        ...state,
        store: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const useAPI = (url) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const getStores = async () => {
    try {
      dispatch({ type: SET_LOADING });
      const res = await axios.get(url);
      dispatch({ type: GET, payload: res.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };

  const postStore = async (p) => {
    try {
      dispatch({ type: SET_LOADING });
      const { data } = await axios.post(url, p);
      dispatch({ type: POST, payload: data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };

  const getSingleStore = async (id) => {
    try {
      dispatch({ type: SET_LOADING });
      const { data } = await axios.get(`${url}/${id}`);
      dispatch({ type: GET_SINGLE, payload: data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };

  const editStore = async (id, body) => {
    try {
      dispatch({ type: SET_LOADING });
      const { data } = await axios.put(`${url}/${id}`, body);
      dispatch({ type: EDIT, payload: data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };

  const deleteStore = async (id) => {
    try {
      dispatch({ type: SET_LOADING });
      await axios.delete(`${url}/${id}`);
      dispatch({ type: DELETE, payload: id });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };

  return {
    data: state.stores,
    isLoading: state.isLoading,
    error: state.error,
    item: state.store,
    get: getStores,
    getSingle: getSingleStore,
    postStore,
    del: deleteStore,
    editStore,
  };
};

export default useAPI;
