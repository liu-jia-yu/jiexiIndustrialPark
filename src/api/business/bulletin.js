import request from '@/utils/request'

// 查询新闻列表
export function listBulletin(query) {
  return request({
    url: '/business/bulletin/list',
    method: 'get',
    params: query
  })
}

// 查询新闻详细
export function getBulletin(id) {
  return request({
    url: '/business/bulletin/' + id,
    method: 'get'
  })
}

// 新增新闻
export function addBulletin(data) {
  return request({
    url: '/business/bulletin',
    method: 'post',
    data: data
  })
}

// 修改新闻
export function updateBulletin(data) {
  return request({
    url: '/business/bulletin',
    method: 'put',
    data: data
  })
}

// 删除新闻
export function delBulletin(id) {
  return request({
    url: '/business/bulletin/' + id,
    method: 'delete'
  })
}
