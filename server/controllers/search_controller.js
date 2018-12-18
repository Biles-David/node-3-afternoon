const swag = require('../models/swag');

function search ( req, res, next ) {
  const { category } = req.query;

  if( !category ) {
    res.status( 200 ).json( swag )
  } else {
    let filter = swag.filter( swag => swag.category === category )
    res.status( 200 ).json( filter )
  }
}

module.exports = {
  search
}