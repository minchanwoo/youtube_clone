import passport from 'passport';
import routes from "../routes";
import User from '../models/User';

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async(req, res, next) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      // To Do: Log user in
      next();
    } catch(error) {
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async(accessToken, refreshToken, profile, cb) => {
  const { username, avatar_url, id, email  } = profile._json;

  try {
    const user = await User.findOne({ email });
    if(user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    };

    const newUser = await User.create({
      email,
      name: username,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser)
    
  } catch(error) {
    return cb(error)
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async(accessToken, refreshToken, profile, cb) => {
  console.log('HAHA^^', profile.photos[0].value)
}

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "UserDetail", user: req.user })
}

export const userDetail = async(req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('creator');
    res.render("userDetail", { pageTitle: "UserDetail", user })
  } catch(error) {
    res.redirect(routes.home)
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "EditProfile" })
};

export const postEditProfile = async(req, res) => {
  const bodys = {
    name: req.body.name,
    email: req.body.email,
  };
  if(req.file) {
    bodys.avatarUrl = req.file.location
  } 
  try {
    await User.findByIdAndUpdate(req.user.id, bodys);
      res.redirect(routes.me)
  } catch(error) {
    res.redirect(`/users${routes.editProfile}`)
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });

export const postChangePassword = async(req, res) => {
  const { oldPassword, newPassword, newPassword1 } = req.body;
  
  try {
    if(newPassword !== newPassword1) {
      res.status(400)
      res.redirect(routes.changePassword)
      return;
    };
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch(errror) {
    res.redirect(`/users${routes.changePassword}`)
  }
}
  
