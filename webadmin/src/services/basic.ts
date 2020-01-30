import request from '@/utils/request';
import BASE_URL from '@/utils/base_url';

export async function queryUserList(): Promise<any> {
  return request(BASE_URL + '/api/user/list', { method: 'POST' });
}

export async function queryRoleList(): Promise<any> {
  return request(BASE_URL + '/api/query/roleList');
}

export async function queryAccountList(): Promise<any> {
  return request(BASE_URL + '/api/query/accountList');
}

export async function queryDepartmentList(): Promise<any> {
  return request(BASE_URL + '/api/query/departmentList');
}
