type bodyRequestType = {
  [key: string]: {
    method: string,
    headers?: {
      Accept: string,
      [contentType: string]: string,
    },
  }
};

const defaultBodyForRequestType: bodyRequestType = {
  'GET': {
    method: 'GET',
  },
  'POST': {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  }
};

const requestHelper = (method: string, url: string, requestArgs: any) => {
  const requestBody = defaultBodyForRequestType[method || 'GET'];
  const fetchRequest = fetch(url, { ...requestBody, body: requestArgs });
  return fetchRequest;
};

export default requestHelper;
