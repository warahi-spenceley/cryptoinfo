import * as api from './CoingeckoApi';

global.fetch = jest.fn();
process.env.REACT_APP_COINGECKO_API_URL = "https://coingecko/mock";

beforeEach(() => {
  jest.clearAllMocks();
});

describe('test throwHttpError', () => {

  it('should throw error with http details', async () => {
    const json = { field: "test" };
    const response = {
      status: 403,
      json: async () => json,
    };
    let error;

    try {
      await api.testable.throwHttpError(response);
    } catch (e) {
      error = e;
    }

    expect(error.http).toStrictEqual({
      status: response.status,
      response: json
    });
  });

  it('should throw error without response if json parsing fails', async () => {
    const response = {
      status: 403,
      json: async () => { throw new Error("Mock error"); },
    };
    let error;

    try {
      await api.testable.throwHttpError(response);
    } catch (e) {
      error = e;
    }

    expect(error.http).toStrictEqual({
      status: response.status
    });
  });

});

describe('test makeHttpRequest', () => {

  it('should make request with correct params', async () => {
    const json = { responseField: "test" };
    const mockResponse = {
      json: async () => json,
      ok: true,
    };
    global.fetch.mockResolvedValue(mockResponse);

    const request = {
      method: "post",
      endpoint: "user",
      body: {
        name: "John Doe"
      }
    };

    const expectedRequest = {
      method: request.method,
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.body)
    };

    const response = await api.makeHttpRequest(request);

    expect(response).toStrictEqual(json);
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_COINGECKO_API_URL}/${request.endpoint}`, expectedRequest);
  });

  it('should throw error with http object if response is not ok', async () => {
    const mockResponse = {
      status: 403,
      ok: false,
    };
    global.fetch.mockResolvedValue(mockResponse);

    let error;
    try {
      await api.makeHttpRequest();
    } catch (e) {
      error = e;
    }
    console.log(error)
    expect(error.http).toBeTruthy();
  });
});

describe('test getCoinsData', () => {

  it('should make request with correct params', async () => {
    const json = {someField: "test"};
    global.fetch.mockResolvedValue({ json: async () => json , ok: true });

    const response = await api.getCoinsData();

    expect(response).toStrictEqual(json);

    const [url, request] = global.fetch.mock.calls[0];
    expect(url).toStrictEqual(`${process.env.REACT_APP_COINGECKO_API_URL}/coins/markets?vs_currency=aud`);
    expect(request.method).toStrictEqual('get');
  });

});

describe('test getCoinData', () => {

  it('should make request with correct params', async () => {
    const json = {someField: "test"};
    const mockCoinId = "bitcoin";
    global.fetch.mockResolvedValue({ json: async () => json , ok: true });

    const response = await api.getCoinData(mockCoinId);

    expect(response).toStrictEqual(json);

    const [url, request] = global.fetch.mock.calls[0];
    expect(url).toStrictEqual(`${process.env.REACT_APP_COINGECKO_API_URL}/coins/${mockCoinId}?localization=false&tickers=false&community_data=false&developer_data=false`);
    expect(request.method).toStrictEqual('get');
  });

});