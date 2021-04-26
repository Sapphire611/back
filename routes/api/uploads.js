const router = require('@koa/router')();
const multer = require('@koa/multer');
const aliOss = require('../../provider/ali-oss')
router.prefix('/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post('/image/:username',upload.single('file'),function (ctx, next) {
  let data = {
    path: ctx.request.file.path,
    filename: ctx.request.file.filename,
    contentType: ctx.request.file.mimetype,
  };
  
  let username = ctx.params.username;
  console.log(username);

  // 路径是从项目根目录开始,"用户前缀如何拿到？"
  aliOss.put(username,"./public/" + data.filename).then((res)=>{
    console.log(res);
    data.filename = res;
  });

  console.log(data);

  ctx.body = {
    status: 1,
    msg: 'uploads success',
    data: data,
  };
});

module.exports = router;