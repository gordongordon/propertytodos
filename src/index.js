// import needed libraries
import React from 'react'
import {render} from 'react-dom'
import {observer} from 'mobx-react'


// import rount
//import {Route, Router, IndexRoute, hashHistory} from 'react-router'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//import BottomNavigationBar from './BottomNavigationBar'

// import the view and the viewModel
import {PropertyView} from './PropertyView'
// import {PropertyView} from './SaleHomeView.material'
//import {PropertyView} from './PropertyView.material'
import {PropertyViewModel} from './PropertyViewModel'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap by material-ui
// http://stackoverflow.com/a/34015469/988941s

// create a viewModel singleton
const model = new PropertyViewModel()

var PropertyViewWrapper = React.createClass({
  render: function () {
    return (
        <PropertyView  model={model} />
    );
  }
});

// render the editor
render(
    <PropertyViewWrapper/>
  , document.getElementById('root')
)

  // <Router history={hashHistory}>
  //   <Route path="/" component={Main}>
  //   <IndexRoute component={TodoViewWrapper}/>
  //   <Route path="rent" component={TodoSaleHomeViewWrapper} />
  //   </Route>
  // </Router>
  //
