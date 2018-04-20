import axios from 'axios';

export default axios.create({
  baseURL: 'https://q4nuj0fowb.execute-api.us-west-2.amazonaws.com/dev/',
  headers: {
      'x-api-key': '8FdbmfGyjzy4BvYuOpDA78eRGEK0Vfhabh1Vdj25'
  }
});
