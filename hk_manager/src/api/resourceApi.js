import ajax from './index'

// 1. 获取所属分类
export const getResourceCategory = () => ajax('/api/auth/resource/r_category');

// 2. 获取所属班级
export const getResourceClasses = () => ajax('/api/auth/resource/r_classes');

// 3. 获取所属区域
export const getResourceArea = () => ajax('/api/auth/resource/r_area');

// 4. 获取所属格式
export const getResourceFormat = () => ajax('/api/auth/resource/r_format');

// 5. 获取所属分类
export const getResourceMeta = () => ajax('/api/auth/resource/r_meta');

// 6. 添加
export const addResource = (token, staff_id, profile, name, position, phone, email) => ajax('/api/auth/resource/add', {
    token, staff_id, profile, name, position, phone, email}, 'post');

// 7. 获取资源列表
export const getResourceList = (current, pageSize, field, order, value) => ajax('/api/auth/resource/list', {current, pageSize, field, order, value});

// 8. 设置是否轮播图
export const setFocusResource = (id, is_focus) => ajax('/api/auth/resource/set_focus_resource', {id, is_focus});

// 9. 删除一个资源
export const deleteResource = (id) => ajax('/api/auth/resource/delete_resource', {id});

// 10. 修改一条活动
export const editResource = (token,resource_id, staff_id, imageUrl, name, position, phone, email) => ajax('/api/auth/resource/edit', {
    token,resource_id, staff_id, imageUrl, name, position, phone, email}, 'post');

// 11. 获取上传的文件
export const getFileList = (tag) => ajax('/api/auth/resource/file_list', {tag});
