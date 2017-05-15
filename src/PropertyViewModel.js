import {observable, action, map, toJS} from 'mobx'
import {Property} from './Property'



/* The outline of Gundb with Map object
    gundb

    add( p ) {
    gun.put(p)
   }

   delete( key, p ) {
   get(key).put(null)
   Map.delete( key )
 }

  update( key, p ) {
    get(key).put( p )
    Map.set(p)
  }

  listen( key ) {
   get(key).on()
   if null, then Map.delete(key)
   else Map.set(key)
}

  load() {
   gun.map().val( p => {
    Map.set( p )
  } )
  }

*/



//**
//** Issue can't be sync with 3 objecs, by add todo
//   Problem could be a App can push, but didin't show up on screens or haven't been register on() for a new todo
export class PropertyViewModel{

    // this is an observable array of the todo of our todo editor
    // it is marked as observable because also adding and removing elements
    // from the todo list should be tracked by the view and/or computed values.
    //@observable propertys = new Map(); // property y
    @observable property = null;
    @observable propertyKey = null;

    @observable matchedList = new Map();

    @observable view   = new Map();
    @observable like   = new Map();
    @observable reject = new Map();
    // @observable users = new Map();
    @observable user   = { name: 'none' }
    @observable typeTo = 'none'

    // when the viewmodel is constructed, attempt to load the todos.
    constructor( userName, gun, server ){
      //window.localStorage.clear();
      //this.sellMatchedBuy.clear()
      //this.buyMatchedSell.clear()
      //this.leaseMatchedRent.clear()
      //this.rentMatchedLease.clear()

      this.like.clear()
      this.reject.clear()
      this.view.clear()

      //this.matchedList.clear()

      this.gun = gun;
      this.server = server;
      this.userGun = null;
      this.userName = userName;

      this.currentProperty = null;
      this.user.name = userName;

//    this.load()
    }

    @action
    load( p, key ){
//       this.user.name = userName;
       this.userGun = this.gun.get(this.userName)
       // this.property = new Property();
       this.property = p
       //this.currentProperty = this.userGun.
        // var p = this.property = new Property();
        // p.text = pp.text
        // p.name = pp.name
        // p.location = pp.location
        // p.price = pp.price
        // p.typeTo = pp.typeTo
        // p.typeBy = pp.typeBy
        // p.typeFor = pp.typeFor

       // for use in react display model type
       this.typeTo = p.typeTo
       // storage new property into gundb
       var propertyGun = this.gun.get( p.id)
//        var propertyGun = this.gun.get('building/' + p.name).put( p.serialize() )
       this.currentProperty = propertyGun;

//       this.userGun.get(p.typeTo).set( propertyGun )
//           .get(p.typeBy).put( this.userGun )

       // Add Server, for every who monitoring of any typeTo
       // this.addServer( propertyGun );

       // Call listen for monitoring of typeFor
       this.registerForMatchList( p.typeFor )

       this.propertyKey = this.currentProperty._.soul;
       //this.propertys.set( this.currentProperty._.soul, p );

       // monitoring like, view, reject
       this.statusSet( this.currentProperty )

       return this.userGun;
     }

    // For testing only must create first
    @action
    createTestCase(userName, name, location, typeTo, typeBy, typeFor, price ){
        this.user.name = userName;
        this.userGun = this.gun.get(userName).put( { name : userName} )
        var p = this.property = new Property();
        p.text = userName
        p.name = name
        p.location = location
        p.price = price
        p.typeTo = typeTo
        p.typeBy = typeBy
        p.typeFor = typeFor

        // for use in react display model type
        this.typeTo = typeTo
        // storage new property into gundb
        var propertyGun = this.gun.get( p.id).put( p.serialize() )
//        var propertyGun = this.gun.get('building/' + p.name).put( p.serialize() )

        this.currentProperty = propertyGun;

  		  this.userGun.get(p.typeTo).set( propertyGun )
  		      .get(p.typeBy).put( this.userGun )

        // Add Server, for every who monitoring of any typeTo
  			this.addServer( propertyGun );

        // Call listen for monitoring of typeFor
  			this.registerForMatchList( p.typeFor )

        this.propertyKey = this.currentProperty._.soul;
        //this.propertys.set( this.currentProperty._.soul, p );

        // monitoring like, view, reject
        this.statusSet( this.currentProperty )

        return this.userGun;
    }


    // @action
    // login( user ) {
    //   var count = 0;
    //   this.gunUser = this.users.get( user )
    //   this.propertys.clear()
    //   this.matchedList.clear()
    //   this.reload()
    //   this.gunUser.get('buy').map().val( (p, key) => {
    //     if ( p !== null) {
    //       if ( count++ === 0 ) {
    //         this.currentProperty = this.gun.get('building/'+ p.name)
    //       }
    //        this.propertys.set( key, p)
    //     }
    //   })
    // }


    @action
    likeGun( keyProperty ) {
       var that = this;

       //console.log( 'gunKey ', keyProperty)
       this.gun.get( keyProperty ).val( (p) => {
          if ( that.currentProperty === null) {
            console.log( 'currentProperty === null', that.user.name)
          }
          // May looking into future,
          // should it be update remote PropertyGun
          console.log( 'like Property ', p, that.user.name)
          var propertyRef  = that.gun.get( p.id )
//          this.likeNew( that.currentProperty, p)
          this.likeNew( propertyRef, that.currentProperty )
       })

    }

    @action
    likeNew( propertyY, propertyX ) {
			 propertyY.get('like').set( propertyX )
       //propertyX.get('like').set( propertyY )
		}

    @action
    rejectGun( keyProperty ) {
      const that = this;
      this.gun.get( keyProperty ).val( (p) => {
         var propertyRef = that.gun.get( p.id )
//         this.rejectNew( that.currentProperty, p)
         this.rejectNew( propertyRef, that.currentProperty)
         this.matchedList.delete( keyProperty )
         console.log( 'call rejectGun reject', that.user.name)

      })
    }
    @action
    rejectNew( propertyY, propertyX ) {
			 propertyY.get('reject').set( propertyX )
		}

    @action
    viewNew( propertyY, propertyX ) {
			 propertyY.path('view').set( propertyX )
		}

    // Handleing remove current property locally!
    // Remove everything
    // Relationship and MatchedList
    @action
    removeGun( keyProperty ) {
      this.gun.get( keyProperty ).put(null)
      this.server.get('buy').get( keyProperty ).put(null)
      this.currentProperty.get('match').get( keyProperty).put(null)
      this.matchedList.clear()
      this.like.clear()
      this.reject.clear()
      this.view.clear()
      this.property = null
    }

    @action
    matchNew( yGun, x ) {

			if ( yGun._.put.location === x.location && yGun._.put.typeTo === x.typeFor) {
				return true;
			} else {
				return false;
			}
		}

    @action
    addServer( propertyGun ) {
 			this.server.get(propertyGun._.put.typeTo).set( propertyGun )
		}


    @action
    registerForMatchList( typeFor ) {
		  var that = this;

      console.log( 'call registerForMatchList')
      // this.getMatchedList()
		  //server.path('sell').map().on()
		  this.server.get( typeFor ).map().on( (p, key) => {
        // Remotely: handle sequence of action once, matched object has removed
        // should remove all Map Object
        if ( p === null ) {
          that.matchedList.delete( key )
          that.currentProperty.get('like').get(key).put( null )
          that.like.delete(key)
          that.currentProperty.get('reject').get(key).put( null )
          that.reject.delete(key)
          that.currentProperty.get('view').get(key).put( null )
          that.view.delete(key)

          //that.currentProperty.get('match').get(key).put(null)
        } else {
 				if ( that.matchNew( that.currentProperty, p ) ) {
           that.currentProperty.get('match').set( p )
           that.matchedList.set( key, p );

           //that.currentProperty.path('match').map().on( (p, key) => {
            // that.matchedList.set( key, p );
            // console.log( 'that.matchedList matched', p )
          // })
			 }}
     }, true)

      this.server.get('sell').val( (p) => {
        console.log( 'server.sell', p )
      })
      this.server.get('buy').val( (p) => {
        console.log( 'server.buy', p )
      })
		}


    @action
    statusSet( propertyGun ) {
			 const that = this;

       propertyGun.get('like').map().on( (p, key ) => {
            if ( p !== null ) {
						 that.like.set( key, p )
					 }
			 }, true)
			 propertyGun.get('reject').map().on( (p, key) => {
           if ( p !== null ) {
						 that.reject.set( key, p )
             that.matchedList.delete( key )
             console.log( 'call statusSet reject', that.user.name)
					 }
          that.matchedList.delete( key )
			 }, true)
			 propertyGun.get('view').map().on( (p, key ) => {
           if ( p !== null ) {
						 that.view.set( key, p )
					 }
			 }, true)
		}

    //
    // @action
    // clear() {
    //    this.gun.put(null)
    // }
    //
    // // remove and deletes the given todo
    // @action
    // remove( key ) {
    //
    //   this.gun.get(this.userY.name).get(key).put(null);
    //
    //   // Delete menally, because when put(null) with key, listen woudn't tracker
    //   this.propertys.delete( key );
    // };
    //
    // @action
    // load() {
    //     var that = this;
    //
    //     this.gun.get(this.userY.name).map().val( (property, key) => {
    //       if ( property !== null ) {
    //         // assign property to be monitored, update
    //         that.listen( key );
    //         that.propertys.set( key, property );
    //         console.log( 'load() loads Property', property)
    //       } else {
    //         console.log( 'error shoudn\'t have null property in loadGunDb')
    //       }
    //     })
    // }
    //
    // @action
    // update( key, property ) {
    //
    //   this.gun.get(this.userY.name).path( key ).put(  { ...property } , (ack) => {
    //     if (ack.err) {
    //       console.log('update() ack.err', ack.err)
    //     } else {
    //       console.log('update() ack.ok')
    //     }
    //   });
    //   return;
    //  }
    //
    // // save todos, if possible
    // // don't know if we still need it!
    // @action
    // save(){
    //     const that = this;
    //
    //     this.propertys.forEach( (property, key) => {
    //        that.gun.get(that.userY.name).get(key).pull( property );
    //     })
    // }

}
