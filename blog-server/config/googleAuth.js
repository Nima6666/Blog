const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GoogUsr = require("../model/googleOauthUser");
const user = require("../model/users");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET_KEY,
            callbackURL: "http://localhost:3000/api/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const foundUser = await GoogUsr.findById(profile._json.sub);
            req.accessToken = accessToken;

            if (foundUser) {
                return cb(null, foundUser);
            }

            console.log(profile);

            const usr = new GoogUsr({
                _id: profile._json.sub,
                name: profile._json.name,
                email: profile._json.email,
                profileImg: profile._json.picture,
            });

            await usr.save();

            req.user = {
                id: profile.id,
                displayName: profile.displayName,
                email: profile.email,
            };
            return cb(null, usr);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await user.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
