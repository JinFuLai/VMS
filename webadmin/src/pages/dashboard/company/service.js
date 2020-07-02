import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryList(params) {
  return request(`${BASE_URL}/api/account/list`, { method: 'POST', data: {...params},}); 
}
export async function queryCreate(params) {
  return request(`${BASE_URL}/api/account/create`, { method: 'POST', data: {...params},}); 
}
export async function queryDelete(params) {
  return request(`${BASE_URL}/api/account/delete`, { method: 'DELETE', data: {...params},});
}
export async function queryUpdata(params) {
  return request(`${BASE_URL}/api/account/update`, { method: 'POST', data: {...params},});
}
// export async function queryContactsCreate(params) {
//   return request(`${BASE_URL}/api/account/createContacts`, { method: 'POST', data: {...params},});
// }