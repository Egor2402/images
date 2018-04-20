import {LOAD_IMAGES_LIST, LOAD_IMAGES_LIST_SUCCESS, DELETE_IMAGE, DELETE_IMAGE_SUCCESS, LOAD_IMAGE, LOAD_IMAGE_SUCCESS} from '../constants/Image';

import api from '../api';

export const getImagesList = () => dispatch => {
    dispatch({type: LOAD_IMAGES_LIST});

    api.get('/Image').then(({ data }) => {
      dispatch({
        type: LOAD_IMAGES_LIST_SUCCESS,
        payload: data
      });
    }, () => console.log('Error'));
}

export const getImage = (id) => dispatch => {
    dispatch({type: LOAD_IMAGE});

    api.get(`/Image/${id}`).then(({ data }) => {
      dispatch({
        type: LOAD_IMAGE_SUCCESS,
        payload: data
      });
    }, () => console.log('Error'));
}

export const deleteImage = id => dispatch => {
    dispatch({type: DELETE_IMAGE});

    api.delete(`/image/${id}`).then(({data}) => {
        dispatch({type: DELETE_IMAGE_SUCCESS, payload: {
                id
            }});
    }, () => console.log('Error'));
}
