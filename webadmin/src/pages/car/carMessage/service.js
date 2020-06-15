import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryList(params) {
  return request(`${BASE_URL}/api/vehicle/all`, { method: 'GET', data: {...params},}); 
}
export async function queryDelete(params) {
  return request(`${BASE_URL}/api/role/delete`, { method: 'POST', data: {...params},});
}