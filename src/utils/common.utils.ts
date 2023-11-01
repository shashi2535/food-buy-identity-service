export function setSuccessResponse(data: unknown = null, message = 'Success') {
  return {
    status: true,
    message,
    data,
  };
}

export function setErrorResponse(message = 'Error', data = null) {
  return {
    status: false,
    message,
    data,
  };
}

export function setInitialResponse() {
  return {
    status: false,
    message: '',
    data: null,
  };
}

export const generateOtpOnEmail = (digit: number) => {
  const list = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  let res = '';
  for (let i = 0; i < digit; i++) {
    const rnd = Math.floor(Math.random() * list.length);
    res = res + list.charAt(rnd);
  }
  return res;
};

export const generateOtpForPhone = () => {
  return Math.floor(Math.random() * 1000000 + 1);
};
