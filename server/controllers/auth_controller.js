const users = require('../models/users');
let id = 1;

function login ( req, res, next ) {
  const { session } = req;
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password );

  if( user ){
    session.user.username = user.username;
    res.status( 200 ).json( session.user )
  } else {
    res.status( 500 ).json( err => console.log("No user found.") )
  }
}

function getUser ( req, res, next ) {
  res.status( 200 ).json( req.session.user )
}

function signOut ( req, res, next ) {
  req.session.destroy();
  res.status( 200 ).json( req.session );
}

function register ( req, res, next ) {
  const { username, password } = req.body;
  users.push({ id, username, password });
  id++;
  req.session.user.username = username;
  res.status( 200 ).json( req.session.user)
}

module.exports = {
  login,
  getUser,
  signOut, 
  register
}
