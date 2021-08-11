import ajax from './index'

// 1. 各个资源总数量
export const getSourceCount = () => ajax('/api/auth/home/source_count');

// 2. 各个资源总购买数控
export const getBuyCount = () => ajax('/api/auth/home/buy_count');


// 3. 获取网站的配置信息
export const getWebSiteMsg = () => ajax('/api/auth/home/msg');

// 4. 修改网站的配置信息
export const editWebSiteMsg = (token, site_name, site_keyword, site_des, site_logo, site_copy, site_bei) => ajax('/api/auth/home/edit', {
    token,
    site_name,
    site_keyword,
    site_des,
    site_logo,
    site_copy,
    site_bei
}, 'post');