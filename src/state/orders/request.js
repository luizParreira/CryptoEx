import {Cmd} from 'redux-loop';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const request = async (url: string) => {
  const response = await global.fetch(url, {
    headers,
    method: 'GET'
  });

  return {
    ok: response.ok,
    status: response.status,
    data: await response.json()
  };
};

export const ordersRequest = (url, success) =>
  Cmd.run(request, {
    args: [url],
    successActionCreator: success
  });
