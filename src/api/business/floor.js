import request from '@/utils/request'

// 查询楼层列表
export function listFloor(query) {
  return request({
    url: '/business/floor/list',
    method: 'get',
    params: query
  })
}

// 查询楼层详细
export function getFloor(id) {
  return request({
    url: '/business/floor/' + id,
    method: 'get'
  })
}

// 新增楼层
export function addFloor(data) {
  return request({
    url: '/business/floor',
    method: 'post',
    data: data
  })
}
// 新增楼层
export function addFloors(data) {
  return request({
    url: '/business/floor/addList',
    method: 'post',
    data: data
  })
}

// 修改楼层
export function updateFloor(data) {
  return request({
    url: '/business/floor',
    method: 'put',
    data: data
  })
}

// 删除楼层
export function delFloor(id) {
  return request({
    url: '/business/floor/' + id,
    method: 'delete'
  })
}
