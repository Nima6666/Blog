const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../model/users");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET_KEY,
            callbackURL: "http://localhost:3000/api/google/callback",
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, cb) => {
            console.log(profile);

            req.accessToken = accessToken;
            req.user = {
                id: profile.id,
                displayName: profile.displayName,
                // Add other properties as needed
            };
            return cb(null, profile);
        }
    )
);
