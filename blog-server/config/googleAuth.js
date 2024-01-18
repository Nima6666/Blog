const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GoogUsr = require("../model/googleOauthUser");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET_KEY,
            callbackURL: "http://localhost:3000/api/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const foundUser = await GoogUsr.findOne({
                googleAssignedID: profile._json.sub,
            });

            console.log(profile);

            if (foundUser) {
            }

            const usr = new GoogUsr({
                name: profile._json.name,
                email: profile._json.email,
                googleAssignedID: profile._json.sub,
            });

            await usr.save();

            req.accessToken = accessToken;
            req.user = {
                id: profile.id,
                displayName: profile.displayName,
                email: profile.email,
            };
            return cb(null, profile._json);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
