export function requestSuccessFunc(requestObj) {
  let token = sessionStorage.getItem('TOKEN');
  if (token) {
    requestObj.headers.Authorization = token;
  }
  return requestObj;
}

export function requestFailFunc(requestError) {
  console.log(requestError);
  return Promise.reject(requestError);
}

export function responseSuccessFunc(responseObj) {
  // TODO: 如果返回的result为9 代表未登录 跳转到登录页
  const resData = responseObj.data;
  const { result } = resData;
  if (result === 9) {
    location.href = '/login';
  }
  return resData;
}

export function responseFailFunc(responseError) {
  return Promise.reject(responseError);
}
