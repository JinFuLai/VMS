import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryList(params) {
  return request(`${BASE_URL}/api/role/list`, { method: 'post', data: {...params},});
}
export async function queryCreate(params) {
  return request(`${BASE_URL}/api/role/create`, { method: 'POST', data: {...params},});
}
export async function queryDelete(params) {
  return request(`${BASE_URL}/api/role/delete`, { method: 'DELETE', data: {...params},});
}
export async function queryUpdata(params) {
  return request(`${BASE_URL}/api/role/update`, { method: 'POST', data: {...params},});
}