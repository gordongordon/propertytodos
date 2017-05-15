
var user = { name : 'gordon '}
var server = { name: 'ymatchx', url : 'www.ymatchx.com'}
var buyPropertys = new Map();

user = gun.get( user.name ).put( user )
server = gun.get( 'server' ).put( server )
// Add new property
var property = { name: 'double cove', location : 'wu ka sha', price : '18000', typeTo : 'sell', typeBy : 'forSellBy'}

function add() {
  // create property and assign location
  property.get('building/'+property.name).path(property.location).set(property);
  property.get('building/'+property.name).put(null)

  // user sale home for sell by user
  user.path(property.typeTo).put( property )
      .path(property.typeBy).put(user)

  // Tell server home for sale
  server.path(property.type).set( property )
}

// listen to update
function listen() {
  var that = this;

  server.path('sell').map().on()
  server.path('buy').map().on( (p) => {
    // if matched, insert to buyPropertys
     if ( match( that.propertyForSell, p ) ) {
       that.buyPropertys.set( p );
     }
  })
  server.path('lease').map().on()
  server.path('rent').map().on()
}

// delete
function remove( key , property ) {
  property.get('building/'+property.name).put(null)
}

function match( y, x ) {
  return true;
}

// Loading user's properties
function load() {
// Pre contion : user
// loading properties for sale
   user.path('sell').map().val( (p) => {
      console.log('loading ', p )
})

function update(property) {
   user.path('sell').put({...property})
}


}
