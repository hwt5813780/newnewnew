module.exports = (req, res, next) => {
    const path = req.path;
    // 1. 验证是否是后端接口，所有非后端接口会跳过 后端接口均已/api/auth开头
    if (path && path.indexOf('/api/auth/') === -1) {
        return next();
    }
    // 2. 所有后端接口（不需要登录的接口需要进行放行）
    if (
        path.indexOf('/api/auth/admin/login') !== -1 || // 登录
        path.indexOf('/api/auth/admin/reg') !== -1  // 注册
    ) {
        return next();
    }
    // 3. 判断是否处于登录状态
    if (req.session.token) {
        return next();
    }
    // 4. 没有登录 (服务端session中的token失效)
    // 4.1 如果是接口相关
    if (path.indexOf('/api/auth') !== -1) {
        return res.json({
            status: 2,
            msg: '非法访问,没有权限'
        })
    }
    // 4.2 其他情况
    return next(new Error('非法访问'));
};