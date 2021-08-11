import ajax from "./index";
import {saveObj, getObj, removeObj} from '../tools/cache-tool'
import config from './../config/config'

/**
 * 1. 提供给外部判断是否登录的函数
 */
export const isLogin = () => {
    let userObj = getObj(config.ADMIN_KEY);
    return !!userObj.token;
}

/**
 * 2. 登录接口
 */
export const checkLogin = (account, password) => ajax('/api/auth/admin/login', {account, password}, 'POST');

/**
 * 3. 退出登录
 */
export const checkLogOut = () => ajax('/api/auth/admin/logout');

/**
 * 4. 保存用户登录信息
 */
export const saveUser = (userObj) => {
    saveObj(config.ADMIN_KEY, userObj)
}

/**
 * 5. 删除本地存储信息
 */
export const removeUser = () => {
    removeObj(config.ADMIN_KEY);
}

/**
 * 6. 获取用户信息
 * */
export const getUser = () => {
    return getObj(config.ADMIN_KEY) || {};
}

/*
* 7. 修改管理员信息
* */
export const changeAdminMsg = (token, account_name, account_icon) => ajax('/api/auth/admin/edit', {
    token,
    account_name,
    account_icon
}, 'POST');

/*
* 8. 修改管理员密码
* */
export const changeAdminPwd = (token, old_pwd, new_pwd) => ajax('/api/auth/admin/reset_pwd', {
    token,
    old_pwd,
    new_pwd
}, "POST");