import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  region:'ap-northeast-2',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    bucket: 'wetubess/video',
    acl: 'public-read'
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: 'wetubess/avatar',
    acl: 'public-read'
  })
});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if(req.user) {
    res.redirect(routes.home)
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect(routes.home)
  }
}



export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
