const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../model/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET_KEY,
            callbackURL: "http://localhost:3000/api/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const foundUser = await User.findById(profile._json.sub);
            req.accessToken = accessToken;

            if (foundUser) {
                req.user = {
                    user: foundUser,
                };
                return cb(null, foundUser);
            }
            const usr = new GoogUsr({
                _id: profile._json.sub,
                name: profile._json.name,
                email: profile._json.email,
                profileImg: profile._json.picture,
                oAuth: true,
            });

            await usr.save();
            return cb(null, usr);
        }
    )
);

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ userName: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id); // Store only the user ID in the session
});

passport.deserializeUser(async (id, done) => {
    try {
        const foundUser = await User.findById(id);
        done(null, foundUser); // Attach the user object to req.user
    } catch (err) {
        done(err);
    }
});
