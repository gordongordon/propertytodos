import {observable, action, map, toJS} from 'mobx'
import {Property} from './Property'
var Gun = require('gun');
import moment from 'moment'


//**
//** Issue can't be sync with 3 objecs, by add todo
//   Problem could be a App can push, but didin't show up on screens or haven't been register on() for a new todo
export class PropertyViewModel{

    // this is an observable array of the todo of our todo editor
    // it is marked as observable because also adding and removing elements
    // from the todo list should be tracked by the view and/or computed values.
    @observable propertys = new Map();
    @observable items = {}

    // when the viewmodel is constructed, attempt to load the todos.
    constructor(){
        //this.gun = Gun();
       var that = this;
        // this.gun = Gun({
        //   peers: {
        //     'http://localhost:8080/gun': {
        //       backoff: { time: 100, max: 5000, factor: 0.2 }
        //     }
        //   }
        // })

         this.gun = Gun([
           'http://127.0.0.1:8080/gun',
         ]);
        //gordon = this.gun.get('gordon');
//        gordon = Gun('gordon');
        //this.load()
/*
        this.propertys.set( 999, {
            id: 999,
            text: 'hello',
            done: false,
            price : 33,
            location : 'hong kong',
            type: 'sale',
            isAgent: false,
            createdAt: 133
        } )
*/
        this.loadGunDB();

        //this.property = [];
        // console.log('Start GunDB ')
        // this.queryMultiple('gordon');
        // console.log('End GunDB ')

        // gun.get(data_path).map().on((account, ID) => {
        //   var UI = $("#account-" + ID);
        //   if(!account){
        //     UI.remove();
        //     return;
        //   }
        //   updateUI(ID, account);
        // });

        //



        this.gun.get('gordon').on( (item, id) => {
          console.log('constructor gordon.on');
        })

        // initialize all properties' update
        // Listening peer, if any property has been assigned pull(null)
        // remove property from Properties
         this.gun.get('gordon').map().on((property, id) => {
           console.log('->Start of removing null property, with id of ', id);
           if (property === null) {
             var count = that.propertys.size;
             console.log(' Property id is null', id)
             console.log('  propertys.size is before delete', that.propertys.size );
             that.propertys.delete(id);
             if ( count > that.propertys.size ) {
                console.log('   Propertys id has removel null', id );
             } else {
                console.log('   Propertys is hasn\'t been removel null', id)
             }
             console.log('<-End of removing null property');
           return;
        } else {
          console.log('<-End of removing null, and Property is not null', id)
        }
      });




    }

    @action
    gunRef() {
        return this.gun.get('gordon');

    }
    // this is an action, using the "@action" decorator tells MobX we are going to change
    // some observable inside this function. With this function we are going to add a new
    // todo into the tods list.
    @action
    add(){
        var that = this;
        // simple vanilla js, adding a new Todo instance to the todos.
        var newProperty = new Property()
//        console.log( 'newProperty.id ', newProperty.id );
//        newProperty.id++;

        console.log( '******* S', newProperty.serialize() , newProperty.text);
        console.log( '******* NS', newProperty , newProperty.text);


        // Testing only
        newProperty.text = 'Property got updated';
        newProperty.location = moment().format();
        newProperty.price = '$1,000.0';
        // Try to insert into database first, may delete it after that!
        var ref  = this.gun.get('gordon').set( newProperty );

            console.log('-> Start add() with new id of ', newProperty.id, newProperty )
           // Reset Key Id,
            newProperty.id = ref._.soul;
            console.log('-> Start add() with old id of ', newProperty.id, newProperty )
            this.gun.get('gordon').get(newProperty.id).put(  {...newProperty} , (ack) => {

              if(ack.err){
                  return console.log( ' add() ack.err', ack.err)
              }
              console.log(' add() ack.ok')
//              this.propertys.set( newProperty.id, newProperty );
              console.log('   <- End of propertys.set with ', newProperty, newProperty.id)
//            that.propertys.set(newProperty)
//            console.log('add() propertys.length', that.propertys.length)

              // Register new property for future update on
//              this.registerGunOn( newProperty, ref._.soul);
              console.log( 'add() on ', newProperty.id, ref._.soul);
        });


        that.propertys.set(newProperty.id, newProperty)
        this.registerGunOn( newProperty, ref._.soul);



        // this.gun.get('gordon').path(newProperty.id).map().on( (property, id) => {
        //   console.log( 'update fire...')
        //   that.propertys.forEach( (item, index) => {
        //     if ( item.id === newProperty.id ) {
        //          item.text = newProperty.text;
        //        }
        //     });
        // })

        // this.propertys.push(newProperty)
        // console.log('propertys.length', this.propertys.length)
        //
        // // Register new property for future update on
        // this.registerGunOn( newProperty, ref._.soul);
        // console.log('add() on ', newProperty.id, ref._.soul);
//        this.gun.get('gordon').get(newProperty.id).on((property, ID) => {
  //        console.log('add() on ', newProperty.id, ID);
    //    });

        return newProperty
    }

    @action
    clear() {
       this.gun.put(null)
    }



    queryMultiple(data_path) {
      console.log("Query for: " + data_path);
      this.gun.get(data_path).map().val((property, ID) => {
        if(!property){ return }
        // console.log(ID);
        console.log( "Property Name ", property.text, ID);
      });
    }

    // remove and deletes the given todo
    @action
    remove(property){
      const that = this;

      //var options = {};
      //gun.get('something').on(callback, options);
      //options.on.off()
      console.log('remove() try to ', property);
      // Remove gun object by given key 'gordon', key id
      this.gun.get('gordon').path(property.id).put(null, (ack) => {
        // Issue never callback ***
        if ( ack.err ) {
          console.log('remove() ack.err')
          return;
        }
        console.log("remove() ack.ok")

      });

      // Remove property from this.property
      //that.propertys.delete(property.id);
      console.log( "remove()", property.id);
      this.queryMultiple('gordon');
    }

   @action
   updatePropertys( property, id){
     if ( property !== null ) {
        this.propertys.set( id, property );
     }
   }

   // Register update for every aciton of add(), loadGunDb
   @action
   registerGunOn( property, id){

     const that = this;
//     console.log( 'registgerGunOn with id', id)
     // on update
     if ( property !== null ) { // Catch Null
       console.log( 'registgerGunOn with id', id)
     this.gun.get('gordon').get(property.id).on( (property, id) => {
//         console.log('registerGunOn() id ', property.id, id)
         that.updatePropertys( property, id);
     });
   } else {
     console.log('while registerGunOn property === null');
   }
    //    that.propertys.forEach( (item, index) => {
    //       if ( item.id === property.id ) {
    //         item.text = property.text;
    //       }
    //       console.log( "registerGunOn() id ", property.id )
    //    });
    //  });
   }

    @action
    loadGunDB() {
        var that = this;
//          var gordon = Gun('gordon');
        var gordon = this.gun.get('gordon');
        // gordon.map().val( function( property , id) {
        //
        //   // Catch Null Object, dont' push into array
        //   if(!property)
        //   { console.log( "loadGunDB(): property = null"); return  }
        //
        //    console.log('loadGunDB() - details', property , id, property.id)
        //    property.id = id;
        //    that.propertys.push( Property.deserialize(property) );
        //
        //    // on update
        //    that.registerGunOn( property, id);
        //
        // })

        gordon.map().val( function( property , id) {

          // Catch Null Object, dont' push into array
          if(property === null)
          { console.log( "loadGunDB(): property = null"); return  }

          console.log('loadGunDB() - details', property , id, property.id)
          property.id = id;
          that.propertys.set( id, property );

           // on update
           that.registerGunOn( property, id);

           console.log( 'LoadGunDB size ', that.propertys.size );
           that.propertys.forEach( ( property ) => {
             console.log( 'loadGunDBforEach ', property.id, property );
           })
        })


      // on Update

                  // gordon.map().val(  (value) => {
                  //   let items = Object.assign({}, that.items, Property.deserialize(value) );
                  //   that.items = items;
                  //   console.log( Property.deserialize(value) )
                  // });

    }
//     // load saved todos, if possible.
//     @action
//     load(){
//       var that = this;
//       var gordon = this.gun.get('gordon');
//       gordon.map().val( function( property ) {
//          console.log('loadGunDb', property )
//          that.propertys.push( Property.deserialize(property) );
//       })
// //         var that = this;
// //         //var array = [];
// //
// //         // if the browser has support for localStorage, try to retrieve the saved todos
// //         // if(window.localStorage){
// //         //   const json = JSON.parse(window.localStorage.getItem("propertys") || "[]")
// //         //
// //         //    console.log( 'json ', json );
// //         //     // Notice: the todo => Todo.deserialize(todo) is an ES2015 arrow function
// //         //     this.propertys = json.map(property => Property.deserialize(property))
// //         //     console.log('this.propertys[0] ', this.propertys[0]);
// //         // }
// //
// //          var gordon = gun.get('gordon');
// // //
// // // /*
// // //         // Watch Out for the call back with array.length = null
// // //         gordon.map().val( function(property) {
// // //
// // //            array.push( Property.deserialize( property ));
// // //            console.log("property is", Property.deserialize(property) );
// // //            console.log("property no dese", property );
// // //            console.log("array.length", array.length);
// // //         //    if ( array.length > 0) {
// // //         //    that.propertys[array.length-1] = array[array.length-1]  ;
// // //         //  }
// // //       });
// // //
// // //          that.propertys = array;
// // // */
// // //
// //           gordon.map((value,id) => {
// //             let items = Object.assign({}, that.items, Property.deserialize(value) );
// //             that.items = items;
// //             console.log( Property.deserialize(value)  )
// //           });
// // //
// //           console.log( "this.items ", that.items );
//     }

    @action
    update( property ) {

      this.gun.get('gordon').path(property.id).put(  { text : property.text } , (ack) => {
        if (ack.err) {
          console.log('update() ack.err', ack.err)
        } else {
          console.log('update() ack.ok')
        }
      });


      // this.propertys.forEach( (item, index) => {
      //    if ( item.id === property.id ) {
      //      item.text = property.text;
      //    }
      //    console.log( "update() id ", property.id )
      // });

/// On Update:
      //  this.gun.get('gordon').path(property.id).on((property, ID) => {
      //    console.log('update() on ', property.id, ID);
      //  });
       return;

      // this.propertys = this.propertys.map( (item) => {
      //   if ( item.id === property.id ) {
      //     item.text = property.text;
      //   }
      // })

     }


   @action
   saveOne( property ) {

     var gordon = this.gun.get('gordon');

    console.log( "saveone() before property.serialize ", property.id);

     var ref =  gordon.set( property );

     // Reset Key Id,
     property.id = ref._.soul;
     ref =  this.gun.get('gordon').path(property.id).put(  {id : property.id, text : 'Jeff'} );
          console.log( "ref ", ref );

     console.log( "saveone() after property.serialize properyt.id", property.id);

     // console.log( ".set" , gordon.set( property.serialize() )._.soul );
     console.log( "property.serialize()", property.serialize());

     gordon.val( function( value ) {
        console.log( "gordon.val", value)
     })

    //  gordon.map().val( function( property ) {
    //    // Catch Null Object, dont' push into array
    //    if(!property)
    //    { console.log( "SaveOne(): property = null"); return  }
     //
    //     console.log('SaveOne', property )
    //  })
   }

    // save todos, if possible
    @action
    save(){

        var that = this;
        // **** Keeep it ***
        // are there invalid todos?
        // if(this.propertys.filter(property => property.isValid === false).length > 0){
        //     alert("Unable to save: There are invalid Propertys.")
        // }


//        var myArray = [{hello: 'world'}, {you: 'are'}, {so: 'wonderful'}];
        var gordon = this.gun.get('gordon');



        this.propertys.forEach(function(item){
          that.gordon.set(gun.put(item));
        });

        gordon.map(function(item, key){ // print them back out
          console.log("gorodn->item:", item);
        });

        // if(window.localStorage){
        //     window.localStorage.setItem(
        //         "propertys",
        //         JSON.stringify(
        //             //this.propertys.map( property => property.serialize() )
        //             this.propertys.forEach( (property) => {
        //                property.serialize()
        //             })
        //         )
        //     )
        // }
    }
}
