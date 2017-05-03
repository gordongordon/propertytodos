import React, {Component} from 'react';
import {observer} from 'mobx-react'

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


const SaleHomeIcon = <FontIcon className="material-icons">Sale</FontIcon>;
const BuyHomeIcon = <FontIcon className="material-icons">Buy</FontIcon>;
const RentHomeIcon = <FontIcon className="material-icons">Rent</FontIcon>;
const LeaseHomeIcon = <FontIcon className="material-icons">Lease</FontIcon>;


/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
@observer
class BottomNavigationBar extends Component {


  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {

    return (
      <Paper zDepth={3}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Sale Home"
            icon={SaleHomeIcon}
            onTouchTap={() => this.select(0) }
          />
          <BottomNavigationItem
            label="Buy Home"
            icon={BuyHomeIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Rent Home"
            icon={RentHomeIcon}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="Lease Home"
            icon={LeaseHomeIcon}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNavigationBar;
