import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  kakaoLoginCallback
} from "./controller/userController";
import routes from "./routes";

// const GS = GithubStrategy.Strategy;

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); // 쿠키에 저장하는 것
passport.deserializeUser(User.deserializeUser()); // 쿠키에서 가져온 ID를 가지고 정보를 조회하는 것
