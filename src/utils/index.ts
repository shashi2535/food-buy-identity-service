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
