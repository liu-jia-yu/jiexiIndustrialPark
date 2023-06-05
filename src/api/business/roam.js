import request from '@/utils/request'

// 查询漫游路径列表
export function listRoam(query) {
  return request({
    url: '/business/roam/list',
    method: 'get',
    params: query
  })
}

// 查询漫游路径详细
export function getRoam(id) {
  return request({
    url: '/business/roam/' + id,
    method: 'get'
  })
}

// 新增漫游路径
export function addRoam(data) {
  return request({
    url: '/business/roam',
    method: 'post',
    data: data
  })
}

// 修改漫游路径
export function updateRoam(data) {
  return request({
    url: '/business/roam',
    method: 'put',
    data: data
  })
}

// 删除漫游路径
export function delRoam(id) {
  return request({
    url: '/business/roam/' + id,
    method: 'delete'
  })
}
