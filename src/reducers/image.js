import {LOAD_IMAGES_LIST, LOAD_IMAGES_LIST_SUCCESS, DELETE_IMAGE, DELETE_IMAGE_SUCCESS, LOAD_IMAGE, LOAD_IMAGE_SUCCESS} from '../constants/Image';

const initialState = {
    fetching: false,
    images: [],
    editingImage: null
};

export default function image(state = initialState, action) {
    switch (action.type) {
        case LOAD_IMAGES_LIST:
        case DELETE_IMAGE:
        case LOAD_IMAGE:
            return {...state, fetching: true};

        case LOAD_IMAGES_LIST_SUCCESS:
            return {...state, images: action.payload, fetching: false};

        case LOAD_IMAGE_SUCCESS:
            return {...state, editingImage: action.payload, fetching: false};

        case DELETE_IMAGE_SUCCESS:
            return {...state, images: state.images.filter(image => image.id !== action.payload.id), fetching: false};

        default:
            return state;
    }
}
