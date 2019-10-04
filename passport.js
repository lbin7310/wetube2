import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // 쿠키에 저장하는 것
passport.deserializeUser(User.deserializeUser()); // 쿠키에서 가져온 ID를 가지고 정보를 조회하는 것
