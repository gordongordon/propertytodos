import {observable, action, map, toJS} from 'mobx'
import {Property} from './Property'
var Gun = require('gun');

//**
//** Issue can't be sync with 3 objecs, by add todo
//   Problem could be a App can push, but didin't show up on screens or haven't been register on() for a new todo
export class PropertyViewModel{

    // this is an observable array of the todo of our todo editor
    // it is marked as observable because also adding and removing elements
    // from the todo list should be tracked by the view and/or computed values.
    @observable propertys = new Map();
    //const userId = 'gordon'

    // when the viewmodel is constructed, attempt to load the todos.
    constructor(){

      this.gun = Gun([
            'http://127.0.0.1:8080/gun',
      ]);

      this.userId = 'gordon';

      this.load();
    }

   //
   // wouldn't tracka when key === null, which means once. pull(null)
    @action
    listen( key ) {
       const that = this;
       this.gun.get(this.userId).get( key ).on( (property, key) => {
          if ( property === null ) {
            console.log('listen() property === null')
            that.propertys.delete( key );
          } else {
            console.log('listen() property !== null')
            that.propertys.set( key, property ) ;
          }
       });
    }

    // this is an action, using the "@action" decorator tells MobX we are going to change
    // some observable inside this function. With this function we are going to add a new
    // todo into the tods list.
    @action
    add(){

        var newProperty = new Property()
        const ref = this.gun.get(this.userId).set( newProperty.serialize() );
        // Get new Key of newProperty
        const key = ref._.soul;

        this.propertys.set( key, newProperty )
        // listen for update for every new items
        this.listen( key );
    }

    @action
    clear() {
       this.gun.put(null)
    }

    // remove and deletes the given todo
    @action
    remove( key ) {

      this.gun.get(this.userId).get(key).put(null);

      // Delete menally, because when put(null) with key, listen woudn't tracker
      this.propertys.delete( key );
    };

    @action
    load() {
        var that = this;

        this.gun.get(this.userId).map().val( (property, key) => {
          if ( property !== null ) {
            // assign property to be monitored, update
            that.listen( key );
            that.propertys.set( key, property );
            console.log( 'load() loads Property', property)
          } else {
            console.log( 'error shoudn\'t have null property in loadGunDb')
          }
        })

    }

    @action
    update( key, property ) {

      this.gun.get(this.userId).path( key ).put(  { ...property } , (ack) => {
        if (ack.err) {
          console.log('update() ack.err', ack.err)
        } else {
          console.log('update() ack.ok')
        }
      });
      return;
     }

    // save todos, if possible
    // don't know if we still need it!
    @action
    save(){
        const that = this;

        this.propertys.forEach( (property, key) => {
           that.gun.get(that.userId).get(key).pull( property );
        })
    }

}
