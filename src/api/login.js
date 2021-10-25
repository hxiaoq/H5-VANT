import request from '@/utils/request'


// 登录
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}


// 获取用户信息
export function getInfo(data) {
    return request({
        url: '/getInfo',
        method: 'post',
        data
    })
}

// 退出登录
export function logout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data
    })
}