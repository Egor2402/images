import api from '../api';

const GET_IMAGES_LIST = 'GET_IMAGES_LIST';
const DELETE_IMAGE = 'DELETE_IMAGE';
const GET_IMAGE = 'GET_IMAGE';
const SET_ADD_IMAGE_DATA_STATE = 'SET_ADD_IMAGE_DATA_STATE';
const GET_LABELS = 'GET_LABELS';

const initialState = {
    imageListData: {
        images: []
    },
    addImageData: {
        image: null,
        imageObjects: [],
        resolveAddObjectPromise: null
    },
    labels: []
};

export default function image(state = initialState, action) {
    switch (action.type) {
        case GET_IMAGES_LIST: {
            const imageListData = Object.assign({}, state.imageListData, {images: action.payload});
            return {...state, imageListData};
        }

        case GET_LABELS:
            return {...state, labels: action.payload};

        case GET_IMAGE:
            return {...state};

        case DELETE_IMAGE: {
            const imageListData = Object.assign({}, state.imageListData, {images: state.images.filter(image => image.id !== action.payload.id)});
            return {...state, imageListData};
        }

        case SET_ADD_IMAGE_DATA_STATE: {
            const addImageData = Object.assign({}, state.addImageData, action.payload);
            return {...state, addImageData};
        }

        default:
            return state;
    }
}

export const setAddImageDataState = data => dispatch => {
    dispatch({type: SET_ADD_IMAGE_DATA_STATE, payload: data});
}

export const getImagesList = () => dispatch => {
    api.get('/Image').then(({data}) => {
        dispatch({type: GET_IMAGES_LIST, payload: data});
    }, () => console.log('Error'));
}

export const getLabels = () => dispatch => {
    api.get('/Label').then(({data}) => {
        dispatch({type: GET_LABELS, payload: data});
    }, () => console.log('Error'));
}

export const getImage = (id) => dispatch => {
    api.get(`/Image/${id}`).then(({data}) => {
        dispatch({type: GET_IMAGE, payload: data});
    }, () => console.log('Error'));
}

export const deleteImage = id => dispatch => {
    api.delete(`/Image/${id}`).then(({data}) => {
        dispatch({type: DELETE_IMAGE, payload: {id}});
    }, () => console.log('Error'));
}
