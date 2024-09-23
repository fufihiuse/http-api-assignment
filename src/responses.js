// function to send response
const respond = (request, response, content, type, status) => {
  // set status code and content
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  // Exclude bodiless requests
  if (request.method !== 'HEAD' || status !== 204) {
    response.write(content);
  }
  response.end();
};

// XML
const createXMLResponse = (responseObj) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseObj.message}</message>`;
  if ('id' in responseObj) {
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;
  return responseXML;
};
//

// Page not found, respond with 404
const notFound = (request, response) => {
  const responseObj = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };
  const status = 404;

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

const getSuccess = (request, response) => {
  const responseObj = {
    message: 'Success',
  };
  const status = 200;

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

const getBadRequest = (request, response) => {
  const responseObj = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  const status = parsedUrl.searchParams.get('valid') === 'true' ? 200 : 400;

  if (status === 200) { responseObj.message = 'This request has the required parameters'; delete responseObj.id; }

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

const getUnauthorized = (request, response) => {
  const responseObj = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  const status = parsedUrl.searchParams.get('loggedIn') === 'yes' ? 200 : 401;

  if (status === 200) { responseObj.message = 'You have successfully viewed the content.'; delete responseObj.id; }

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

const getForbidden = (request, response) => {
  const responseObj = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  const status = 403;

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

const getInternal = (request, response) => {
  const responseObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  const status = 500;

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

const getNotImplemented = (request, response) => {
  const responseObj = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  const status = 501;

  // XML
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML = createXMLResponse(responseObj);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', status);
  }

  // JSON
  const responseString = JSON.stringify(responseObj);
  return respond(request, response, responseString, 'application/json', status);
};

module.exports = {
  notFound,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
};
