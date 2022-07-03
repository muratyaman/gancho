// identify errors thrown by us
export class GanchoError extends Error {
  name = 'GanchoError';
}

export class GanchoErrorNotFound extends GanchoError {
  name = 'GanchoErrorNotFound';
  constructor(public message = 'Not found') {
    super(message);
  }
}

export class GanchoErrorBadRequest extends GanchoError {
  name = 'GanchoErrorBadRequest';
  constructor(public message = 'Bad request') {
    super(message);
  }
}

export class GanchoErrorDuplicate extends GanchoError {
  name = 'GanchoErrorDuplicate';
  constructor(public message = 'Duplicate') {
    super(message);
  }
}

export class GanchoErrorUnauthorized extends GanchoError {
  name = 'GanchoErrorUnauthorized';
  constructor(public message = 'Unauthorized') {
    super(message);
  }
}

export class GanchoErrorAccessDenied extends GanchoError {
  name = 'GanchoErrorAccessDenied';
  constructor(public message = 'Access denied') {
    super(message);
  }
}
