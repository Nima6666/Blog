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
            console.log(profile);
            try {
                req.accessToken = accessToken;
                const foundUser = await GoogUsr.findById(profile._json.sub);
                console.log(foundUser);

                if (foundUser && foundUser._id == profile._json.sub) {
                    console.log("found", foundUser);
                    return cb(null, foundUser);
                }

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
                    email: profile._json.email,
                };
                return cb(null, usr);
            } catch (err) {
                console.log("error found", err);
                cb(null, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log(user, "serializing");
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
