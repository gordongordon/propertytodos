// import needed libraries
import React from 'react'
import {render} from 'react-dom'
import {observer} from 'mobx-react'
var Gun = require('gun');

// import rount
//import {Route, Router, IndexRoute, hashHistory} from 'react-router'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//import BottomNavigationBar from './BottomNavigationBar'

// import the view and the viewModel
import {PropertyView} from './PropertyView'
// import {PropertyView} from './SaleHomeView.material'
//import {PropertyView} from './PropertyView.material'
import {PropertyViewModel} from './PropertyViewModel'
import {PropertyViewModels} from './PropertyViewModels'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap by material-ui
// http://stackoverflow.com/a/34015469/988941s

var gun = Gun([
         'http://127.0.0.1:8080/gun',
   ]);

//var gun = Gun();

var server = gun.get('server').put( { name : 'ymatchx', url : 'http://www.ymatchx.com' } );


// create a viewModel singleton
//const model = new PropertyViewModel()

const modelsGordon = new PropertyViewModels('gordon', gun, server)
modelsGordon.load('gordon')
const modelsJeff   = new PropertyViewModels('jeff', gun, server)
modelsGordon.load('jeff')
const modelsLala   = new PropertyViewModels('lala', gun, server)
modelsGordon.load('lala')
//const models = new PropertyViewModels('gordon')
//const models = new PropertyViewModels('gordon')
var userName = 'none'


function choiceUser( name ){
  userName = name
}

function renderUser() {

   if ( userName === 'gorodn ') {
     return   <PropertyView  model={model} models={modelsGordon}/>
   }  else {
     return   <PropertyView  model={model} models={modelsJeff}/>
   }
}

// render the editor
render(
  <div>
   <PropertyView  models={modelsJeff}/>
   <PropertyView  models={modelsGordon}/>
   <PropertyView  models={modelsLala}/>

  </div>
  , document.getElementById('root')
)

  // <Router history={hashHistory}>
  //   <Route path="/" component={Main}>
  //   <IndexRoute component={TodoViewWrapper}/>
  //   <Route path="rent" component={TodoSaleHomeViewWrapper} />
  //   </Route>
  // </Router>
  //
