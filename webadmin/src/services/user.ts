import request from '@/utils/request';
import BASE_URL from '@/utils/base_url';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryUserList(pargram:any) {
  return request(`${BASE_URL}/api/user/list`, { method: 'POST', data: {...pargram},});
}

export async function queryUserDelete(pargram:any) {
  return request(`${BASE_URL}/api/user/delete`, { method: 'POST', data: {...pargram},});
}