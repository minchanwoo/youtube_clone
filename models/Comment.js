import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
  // video: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Video"
  // }
});

const model = mongoose.model('Comment', CommentSchema);

export default model;

//몽고 디비에서 관계형을 맺는 방법은 두가지가 있다
//위의 주석처리 한 부분처럼 댓글에서 비디오를 가져오는 방법은 이 댓글이 달린 비디오 객체를 가져올수 있다
// type: mongoose.Schema.Types.ObjectId, 이부분에서 Schema가 Video.js의 
// const model = mongoose.Model('Comment', CommentSchema) Model안에 정의된 이름으로 찾는다
// 반대로 Video.js에서 comment를 가져오려면 반대로 하면 되는데
// Video.js는 video 아래에 달린 여러 댓글들의 배열을 가져오는 것이므로 
// comment: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Video"
  // }]
//comment객체 생성시 배열로 만들어줘야 한다!!!