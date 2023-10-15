import { Schema, model, models } from "mongoose";

// 推荐使用无密码登录, 所以只需要建立第三方验证登录返回的这三个数据存入数据库即可!
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, '邮件已存在!'],
    required: [true, '邮件是必须的!']
  },
  username: {
    type: String,
    unique: [true, '用户名已存在!'],
    required: [true, '用户名是必须的!']
  },
  image: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  }
})

const User = models.User || model('User', UserSchema);

export default User;