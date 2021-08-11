const express = require('express');
const router = express.Router();

const {resource_file_up, resource_img_up} = require('../controller/manageAPI/uploadImg');
const Query = require('./../config/dbHelper');

// 多文件上传
router.post('/upload_many_file', resource_file_up.array('resource_file', 10), function (req, res, next) {
    res.json({
        status: 1,
        data: {
            url: "uploads/resource/" + req.files[0].filename,
            name: req.files[0].originalname,
            uid: req.files[0].filename
        }
    })
});

// 获取所属分类
router.get('/r_category', (req, res, next) => {
    const sql = `SELECT * FROM t_resource_category;`;
    Query(sql).then((result) => {
        res.json({
            status: result.code,
            data: result.data
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            data: error.data
        })
    })
});

// 获取所属班级
router.get('/r_classes', (req, res, next) => {
    const sql = `SELECT * FROM t_resource_classes;`;
    Query(sql).then((result) => {
        res.json({
            status: result.code,
            data: result.data
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            data: error.data
        })
    })
});

// 获取所属区域
router.get('/r_area', (req, res, next) => {
    const sql = `SELECT * FROM t_resource_area;`;
    Query(sql).then((result) => {
        res.json({
            status: result.code,
            data: result.data
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            data: error.data
        })
    })
});

// 获取所属格式
router.get('/r_format', (req, res, next) => {
    const sql = `SELECT * FROM t_resource_format;`;
    Query(sql).then((result) => {
        res.json({
            status: result.code,
            data: result.data
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            data: error.data
        })
    })
});

// 获取所属分类
router.get('/r_meta', (req, res, next) => {
    const sql = `SELECT * FROM t_resource_material;`;
    Query(sql).then((result) => {
        res.json({
            status: result.code,
            data: result.data
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            data: error.data
        })
    })
});

// 上传直播封面图和焦点图
router.post('/upload_resource', resource_img_up.single('profile'), (req, res, next) => {
    res.json({
        status: 1,
        msg: '图片上传成功',
        data: {
            name: '/uploads/images/resource/' + req.file.filename
        }
    })
});

// 添加资源
router.post('/add', (req, res, next) => {
    if (req.body.profile == "") {
        req.body.profile = "/uploads/images/resource/1628558455340.jpeg"
    }

    const {token, staff_id, profile, name, position, phone, email} = req.body;

    if (req.session.token !== token) {
        res.json({
            status: 0,
            msg: '非法用户!'
        });
    } else {

            // 执行插入操作
                const sql1 = `INSERT INTO t_resource(staff_id, profile, name, position, phone, email) VALUES (?,?,?,?,?,?);`;
                const value = [staff_id, profile, name, position, phone, email];
                Query(sql1, value).then((result) => {
                    res.json({
                        status: result.code,
                        msg: 'Added successfully',
                        data: {}
                    })
                }).catch((error) => {
                    console.log(error);
                    res.json({
                        status: error.code,
                        data: error.data
                    })
                }).catch((error) => {
                res.json({
                    status: error.code,
                    data: error.data
                })
            })
        }
});


// 获取资源;列表
router.get('/list', (req, res, next) => {
    // 1. 获取页码和页数
    let pageNum = req.query.current || 1;
    let pageSize = req.query.pageSize || 10;
    let field = req.query.field;
    let order = req.query.order;
    let length=order.length-3;
    let value=req.query.value;
    order=order.substring(0,length);
    let sql1 = `SELECT COUNT(*) as resource_count FROM t_resource;`;
    let sql2 = `SELECT * from t_resource order by id limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
    if(field!==""){
        sql2 = `SELECT * from t_resource order by ${field} ${order} limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
    }
    if(value!==""){
        sql1 = `SELECT COUNT(*) as resource_count FROM (select * from t_resource where concat(staff_id,name,position) like '%${value}%') as a;`;
        sql2 = `SELECT * from (select * from t_resource where concat(staff_id,name,position) like '%${value}%') as a limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
        if(field!==""){
            sql2 = `SELECT * from (select * from t_resource where concat(staff_id,name,position) like '%${value}%') as a order by ${field} ${order} limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
        }
    }


    // 执行SQL
    Query(sql1).then((result1) => {
        Query(sql2).then((result) => {
            res.json({
                status: result.code,
                msg: '获取资源列表成功!',
                data: {
                    resource_count: result1.data[0].resource_count,
                    resource_list: result.data
                }
            })
        }).catch((error) => {
            res.json({
                status: error.code,
                msg: 'Failed to list111111!',
                data: error.data
            })
        })
    })
});

// 删除一个资源
router.get('/delete_resource', (req, res, next) => {
    let id = req.query.id;
    let sql = `DELETE FROM t_resource WHERE id=?`;
    // 执行SQL
    Query(sql, [id]).then((result) => {
        res.json({
            status: result.code,
            msg: 'Deleted successfully!',
            data: {}
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            msg: 'Deleted failed!',
            data: error.data
        })
    })
});

// 获取上传的文件
router.get('/file_list', (req, res, next) => {
    // 1. 获取tag
    let tag = req.query.tag;
    let sql = `SELECT url, name, uid FROM t_resource_file WHERE tag = ?`;

    // 执行SQL
    Query(sql, [tag]).then((result) => {
        res.json({
            status: result.code,
            msg: '获取文件列表成功!',
            data: result.data
        })
    }).catch((error) => {
        res.json({
            status: error.code,
            msg: '获取资源列表失败!',
            data: error.data
        })
    })
});

// 修改一条资源
router.post('/edit', (req, res, next) => {

    const {token,resource_id, staff_id, imageUrl, name, position, phone, email} = req.body;

    if (req.session.token !== token) {
        res.json({
            status: 0,
            msg: '非法用户!'
        });
    } else {
        // 更新资源表
        const sql = `UPDATE t_resource SET staff_id=?, profile=?, name=?, position=?, phone=?, email=? WHERE id = ?;`;
        const value = [staff_id, imageUrl, name, position, phone, email, resource_id];
        console.log(sql);
        Query(sql, value).then((result) => {
            res.json({
                status: result.code,
                msg: '修改活动成功!',
                data: {}
            })
        }).catch((error) => {
            res.json({
                status: error.code,
                msg: '修改活动失败!',
                data: error.data
            })
        });
    }
});

module.exports = router;