/**
 * 
 * @param {Response} response The HTTP response object.
 * @throws {Promise<Error>} An error containing the JSON response and the HTTP code.
 */
const throwHttpError = async (response) => {
  const error = new Error(`API failed with HTTP status "${response.status}". See network logs.`);
  error.http = { status: response.status };
  try {
    error.http.response = await response.json();
  } catch (e) {
    console.warn(`Failed to get JSON from fail response:`, e);
  }
  throw error;
};
/**
 * 
 * Make a HTTP request to the Coingecko API.
 * @param {Object} options Options
 * @param {string} options.method One of the supported [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
 * @param {string} options.endpoint One of the supported [API endpoints](https://www.coingecko.com/en/api/documentation?)
 * @param {Object} options.body The request body.
 * @returns {Promise<Object>} Promise object with the HTTP response.
 */
export const makeHttpRequest = async ({
  method = 'get',
  endpoint = '',
  body
} = {}) => {
  let request = {
    method,
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
  }
  if (body) request.body = JSON.stringify(body);
  
  const url = `${process.env.REACT_APP_COINGECKO_API_URL}/${endpoint}`;

  const response = await fetch(url, request);
  if (!response.ok) await throwHttpError(response);
  return await response.json();
};

/**
 * 
 * Get the data for all crypto currencies (price, market cap, volume etc).
 * @returns {Promise<Object>} Promise object with the HTTP response.
 */
export const getCoinsData = async () => await makeHttpRequest({ method: "get", endpoint: "coins/markets?vs_currency=aud"});

/**
 * 
 * Get the data for one crypto currency.
 * @param {Object} coinId The crypto currency coin ID.
 * @returns {Promise<Object>} Promise object with the HTTP response.
 */
export const getCoinData = async (coinId) => await makeHttpRequest({ method: "get", endpoint: `coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`});

/**
 * Internal functions that should be called in unit tests only
 */
export const testable = {
  throwHttpError,
};
