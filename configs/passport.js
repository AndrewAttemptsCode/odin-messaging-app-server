const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const prisma = require('./prismaClient');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(opts, async (jwtpayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtpayload.id },
        select: {
          id: true,
          username: true,
        },
      });
  
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
)

module.exports = passport;