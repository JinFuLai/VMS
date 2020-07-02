import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryUserList(params) {
  return request(`${BASE_URL}/api/user/list`, { method: 'POST', data: {...params},});
}
export async function queryUserCreate(params) {
  return request(`${BASE_URL}/api/user/create`, { method: 'POST', data: {...params},});
}
export async function queryUserDelete(params) {
  return request(`${BASE_URL}/api/user/delete`, { method: 'Delete', data: {...params},});
}