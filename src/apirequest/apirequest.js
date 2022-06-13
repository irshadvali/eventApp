import Config from 'react-native-config';
export const apirequest = {
  getAll,
};
function getAll(url) {
  const requestOptions = {
    method: 'GET',
    //headers: authHeader(),
  };

  return fetch(`${Config.API_URL}/${url}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  console.log(response.ok);
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
