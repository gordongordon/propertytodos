import {observable, action, map, toJS} from 'mobx'
import {Property} from './Property'
var Gun = require('gun');

export class PropertyViewModel{

    // this is an observable array of the todo of our todo editor
    // it is marked as observable because also adding and removing elements
    // from the todo list should be tracked by the view and/or computed values.
    @observable propertys = []
    @observable items = {}

    // when the viewmodel is constructed, attempt to load the todos.
    constructor(){
        //this.gun = Gun();

        this.gun = Gun([
          'http://localhost:8080/gun',
        ]);
        //gordon = this.gun.get('gordon');
//        gordon = Gun('gordon');
        //this.load()
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

         this.gun.get('gordon').map().on((property, ID) => {
           if(!property){
             console.log(' syn with null')
             console.log(' propertys.length ', this.propertys.length );
             this.propertys = this.propertys.filter( (item) => {
               if ( item.id === ID ) {
                 console.log(' remove syn id ', ID)
                 return false;
               } else {
                 return true;
               }
             })
             console.log(' propertys.length ', this.propertys.length );

//             const index = this.propertys.indexOf(property)
             //if(index > -1){
              //this.propertys.splice(index, 1)
            }

             return;

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
        // simple vanilla js, adding a new Todo instance to the todos.
        const newProperty = new Property()
//        console.log( 'newProperty.id ', newProperty.id );
//        newProperty.id++;
        this.propertys.push(newProperty)
        console.log('propertys.length', this.propertys.length)
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
        // const index = this.propertys.indexOf(property)
        //    if(index > -1){
        //       this.propertys.splice(index, 1)
        // }

      // Remove gun object by given key 'gordon', key id
      this.gun.get('gordon').path(property.id).put(null);
      console.log( "remove() -- ");
      this.queryMultiple('gordon');
    }


    @action
    loadGunDB() {
        var that = this;
//          var gordon = Gun('gordon');
        var gordon = this.gun.get('gordon');
        gordon.map().val( function( property , id) {

          // Catch Null Object, dont' push into array
          if(!property)
          { console.log( "loadGunDB(): property = null"); return  }

           console.log('loadGunDb', property , id)
           property.id = id;
           that.propertys.push( Property.deserialize(property) );
        })

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
      // are there invalid todos?
      if( property.isValid === false ){
          alert("Unable to save: There are invalid Propertys.")
      }

      if(window.localStorage){
          window.localStorage.setItem(
              "propertys",
              JSON.stringify(
                  property.serialize() )
              )
      }
   }


   @action
   saveOne( property ) {

     var gordon = this.gun.get('gordon');

     gordon.set( property.serialize() );
       console.log( "property.serialize()", property.serialize());
     gordon.val( function( value ) {
       console.log( "gordon.val", value)
     })

     gordon.map().val( function( property ) {
       // Catch Null Object, dont' push into array
       if(!property)
       { console.log( "SaveOne(): property = null"); return  }

        console.log('SaveOne', property )
     })
   }

    // save todos, if possible
    @action
    save(){

        // are there invalid todos?
        if(this.propertys.filter(property => property.isValid === false).length > 0){
            alert("Unable to save: There are invalid Propertys.")
        }


//        var myArray = [{hello: 'world'}, {you: 'are'}, {so: 'wonderful'}];
        var gordon = this.gun.get('gordon');



        this.propertys.forEach(function(item){
          gordon.set(gun.put(item));
        });

        gordon.map(function(item, key){ // print them back out
          console.log("gorodn->item:", item);
        });

        if(window.localStorage){
            window.localStorage.setItem(
                "propertys",
                JSON.stringify(
                    this.propertys.map( property => property.serialize() )
                )
            )
        }
    }
}
