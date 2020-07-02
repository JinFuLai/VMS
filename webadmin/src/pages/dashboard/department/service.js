import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryList(params) {
  return request(`${BASE_URL}/api/department/list`, { method: 'POST', data: {...params},}); 
}
export async function queryUpdate(params) {
  return request(`${BASE_URL}/api/department/update`, { method: 'POST', data: {...params},}); 
}
export async function queryCreate(params) {
  return request(`${BASE_URL}/api/department/create`, { method: 'POST', data: {...params},}); 
}
export async function queryDelete(params) {
  return request(`${BASE_URL}/api/department/delete`, { method: 'DELETE', data: {...params},});
}