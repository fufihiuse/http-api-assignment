// Responds with JSON object
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  // HEAD requests don't get a body with their response.
  // Similarly, 204 status codes are "no content" responses
  // so they also do not get a response body.
  if (request.method !== 'HEAD' || status !== 204) {
    response.write(content);
  }

  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'Not found!',
  };
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  notFound,
};
