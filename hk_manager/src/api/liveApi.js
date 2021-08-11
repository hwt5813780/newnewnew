import ajax from './index'

// 1. 获取园区主题
export const getLiveTheme = () => ajax('/api/auth/live/live_theme');

// 2. 获取适用人群
export const getLivePerson = () => ajax('/api/auth/live/live_person');

// 3. 添加一个直播课程
export const addLive = (token, live_title, live_url, live_author, live_price, live_img, live_begin_time, live_end_time,
                        live_person_id, live_theme_id, focus_img) => ajax('/api/auth/live/add', {
    token, live_title, live_url, live_author, live_price, live_img, live_begin_time, live_end_time,
    live_person_id, live_theme_id, focus_img
}, 'POST');

// 4. 获取直播课程列表
export const getLive = (pageNum, pageSize) => ajax('/api/auth/live/list', {pageNum, pageSize});

// 5. 设置是否轮播图
export const setFocusLive = (id, is_focus) => ajax('/api/auth/live/set_focus_live', {id, is_focus});

// 6. 删除一个课程
export const deleteLive = (id) => ajax('/api/auth/live/delete_live', {id});

// 7. 修改一个课程
export const editLive = (token, live_id, live_title, live_url, live_author, live_price, live_img, live_begin_time, live_end_time,
                         live_person_id, live_theme_id, focus_img) => ajax('/api/auth/live/edit', {
    token, live_id, live_title, live_url, live_author, live_price, live_img, live_begin_time, live_end_time,
    live_person_id, live_theme_id, focus_img
}, 'POST');