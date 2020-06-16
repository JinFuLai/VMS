import request from 'umi-request';
import BASE_URL from '@/utils/base_url';

export async function queryList(params) {
  return request(`${BASE_URL}/api/role/list`, { method: 'GET', data: {...params},}); //暂用角色接口
}
export async function queryDelete(params) {
  return request(`${BASE_URL}/api/role/delete`, { method: 'POST', data: {...params},});
}