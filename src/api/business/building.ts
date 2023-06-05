import request from '../../utils/request'

// 查询建筑列表
export function listBuilding(query?){
    return request({
        url: '/business/building/list',
        method: 'get',
        params: query
    })
}

// 查询建筑详细
export function getBuilding(id) {
    return request({
        url: '/business/building/' + id,
        method: 'get'
    })
}

// 新增建筑
export function addBuilding(data) {
    return request({
        url: '/business/building',
        method: 'post',
        data: data
    })
}

// 修改建筑
export function updateBuilding(data) {
    return request({
        url: '/business/building',
        method: 'put',
        data: data
    })
}

// 删除建筑
export function delBuilding(id) {
    return request({
        url: '/business/building/' + id,
        method: 'delete'
    })
}
