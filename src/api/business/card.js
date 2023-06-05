import request from '@/utils/request'

// 查询卡片列表
export function listCard(query) {
  return request({
    url: '/business/card/list',
    method: 'get',
    params: query
  })
}

// 查询卡片详细
export function getCard(id) {
  return request({
    url: '/business/card/' + id,
    method: 'get'
  })
}

// 新增卡片
export function addCard(data) {
  return request({
    url: '/business/card',
    method: 'post',
    data: data
  })
}

// 修改卡片
export function updateCard(data) {
  return request({
    url: '/business/card',
    method: 'put',
    data: data
  })
}

// 删除卡片
export function delCard(id) {
  return request({
    url: '/business/card/' + id,
    method: 'delete'
  })
}
