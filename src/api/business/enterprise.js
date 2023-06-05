import request from '@/utils/request'

// 查询企业列表
export function listEnterprise(query) {
  return request({
    url: '/business/enterprise/list',
    method: 'get',
    params: query
  })
}
// 查询企业列表
export function getDict(query) {
  return request({
    url: '/business/enterprise/listDict',
    method: 'get',
    params:query
  })
}
// 查询企业详细
export function getEnterprise(id) {
  return request({
    url: '/business/enterprise/' + id,
    method: 'get'
  })
}

// 新增企业
export function addEnterprise(data) {
  return request({
    url: '/business/enterprise',
    method: 'post',
    data: data
  })
}

// 修改企业
export function updateEnterprise(data) {
  return request({
    url: '/business/enterprise',
    method: 'put',
    data: data
  })
}

// 删除企业
export function delEnterprise(id) {
  return request({
    url: '/business/enterprise/' + id,
    method: 'delete'
  })
}
