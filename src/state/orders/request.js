import {Cmd} from 'redux-loop';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const request = async (url: string) => {
  try {
    const response = await global.fetch(url, {
      headers,
      method: 'GET'
    });

    return {
      ok: response.ok,
      status: response.status,
      data: await response.json()
    };
  } catch (error) {
    return {ok: false, status: 400, error: 'networkError'};
  }
};

export const ordersRequest = (url, success, failure) =>
  Cmd.run(request, {
    args: [url],
    successActionCreator: success,
    failActionCreator: failure
  });
