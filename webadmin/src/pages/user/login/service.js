import request from 'umi-request';
import BASE_URL from '@/utils/base_url';
// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
export async function fakeAccountLogin(params) {
  return request(`${BASE_URL}/api/user/login`, { method: 'POST', data: { ...params }, });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
