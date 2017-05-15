import {observable, action, map, toJS} from 'mobx'
//import {Property} from './Property'
import {PropertyViewModel} from './PropertyViewModel'

var Gun = require('gun');



//**
//** Issue can't be sync with 3 objecs, by add todo
//   Problem could be a App can push, but didin't show up on screens or haven't been register on() for a new todo
export class PropertyViewModels {

     //  modelSell  = new PropertyViewModel( this.gun, this.server ); // property y
     //  modelBuy   = new PropertyViewModel( this.gun, this.server ); // property y
     //  modelLease = new PropertyViewModel( this.gun, this.server); // property y
     //  modelRent  = new PropertyViewModel( this.gun, this.server ); // property y

//     @observable users = new Map();
     @observable models = []

     constructor( userName , gun, server) {

       // this.gun = Gun([
       //         'http://127.0.0.1:8080/gun',
       //   ]);

      //  this.gun = Gun();
      //  this.server = { name : 'ymatchx', url : 'http://www.ymatchx.com' };
      //  this.server = this.gun.get('server').put( this.server );
      this.gun = gun;
      this.server = server;
      this.userGun = this.gun.get(userName)
      this.userName = userName;

      //this.modelSell  = new PropertyViewModel( this.gun, this.server ); // property y
      //this.modelBuy   = new PropertyViewModel( this.gun, this.server ); // property y
      //this.modelLease = new PropertyViewModel( this.gun, this.server); // property y
      //this.modelRent  = new PropertyViewModel( this.gun, this.server ); // property y
      this.load(userName)
     }

  clear(){
    this.gun.put(null);
    window.localStorage.clear();

  }
   // loading data, while being offline, reload
   @action
   load(userName){
      var that = this;
//     var model = new PropertyViewModel( this.userName, this.gun, this.server );

     //this.userGun = this.gun.get(userName)
     this.userGun.get('sell').map().val( (p, key) => {
        if ( p !== null ) {
           // Catch duplicate model push while create() get call, then get('sell') obj being put, and traget get('sell')
           //if ( (that.models.find( () => that.models.propertyKey === key )) !== undefined ) {
           var model = new PropertyViewModel( that.userName, that.gun, that.server );
           model.load( p, key );
           that.models.push( model );
           console.log( 'loading sell', p)
         //}
        }
        })
     this.userGun.get('buy').map().val( (p, key) => {
        if ( p !== null ) {
          //if ( (that.models.find( () => that.models.propertyKey === key )) !== undefined ) {
          var model = new PropertyViewModel( that.userName, that.gun, that.server );
          model.load( p, key );
          that.models.push( model );
        //}
        } })
     this.userGun.get('lease').map().val( (p, key) => {
        if ( p !== null ) {
          //if ( (that.models.find( () => that.models.propertyKey === key )) !== undefined ) {
           var model = new PropertyViewModel( that.userName, that.gun, that.server );
           model.load( p, key );
           this.models.push( model );
         //}
        } })
     this.userGun.get('rent').map().val( (p, key) => {
        if ( p !== null ) {
          //if ( (that.models.find( () => that.models.propertyKey === key )) !== undefined ) {
           var model = new PropertyViewModel( that.userName, that.gun, that.server );
           model.load( p, key );
           that.models.push( model );
         //}
        }})
   }


   @action
    create(userName, name, location, typeTo, typeBy, typeFor, price ){
       const that = this;
       var model = new PropertyViewModel( this.userName, this.gun, this.server );

       switch ( typeTo ) {
         case 'sell' : {
           this.userGun = model.createTestCase(that.userName, name, location, typeTo, typeBy, typeFor, price )
//           that.users.set( userGun._.soul, { name: userName })
//           this.models.push( model );
           break;
         }
         case 'buy' : {
           this.userGun = model.createTestCase(that.userName, name, location, typeTo, typeBy, typeFor, price )
//           that.users.set( userGun._.soul, { name: userName })
//           this.models.push( model );
           break;
         }
         case 'lease' : {
           this.userGun = model.createTestCase(that.userName, name, location, typeTo, typeBy, typeFor, price )
//           that.users.set( userGun._.soul, { name: userName })
//           this.models.push( model );
           break;
         }
         case 'rent' : {
           this.userGun = model.createTestCase(that.userName, name, location, typeTo, typeBy, typeFor, price )
//           that.users.set( userGun._.soul, { name: userName })
           //this.models.push( model );
           break;
         }
         default :
           console.log('nothing created');
       }
     }
     userGun = null;

}
