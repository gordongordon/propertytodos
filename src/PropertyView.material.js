import React from 'react'
import {observer} from 'mobx-react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import AppBar from 'material-ui/AppBar';


import FlatButton from 'material-ui/FlatButton';

import DatePicker from 'material-ui/DatePicker';
import BottomNavigationBar from './BottomNavigationBar'
import DialogAddProperty from './DialogAddProperty'

const buttonStyle = {
  margin: 12,
};

// This is a React component.
// The property "model" of the passed props object is an instance of our TodoViewModel class.
// do you remember all those @observable and @computed?
// In order to let your React component automatically update whenever any of
// those observable property of an object in the component props update,
// you should pass your component to the "observer" function/decorator
@observer
export class PropertyView extends React.Component{
    render(){
        const model = this.props.model

        // just some HTML markup based of the ViewModel data.
        return  <MuiThemeProvider>
        <div>
          <AppBar title="Y Match X" />

           <BottomNavigationBar/>
                <h1>React & MobX Todo List!</h1>
                <div>
                    <RaisedButton onClick={() => model.add()}  primary={true} style={buttonStyle} label="New" />
                    <RaisedButton onClick={() => model.load()} secondary={true} style={buttonStyle} label="Load" />
                    <RaisedButton onClick={() => model.save()} style={buttonStyle} label="Save" />
                </div>
                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Done?</TableHeaderColumn>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {model.propertys.map((property, i) => <SinglePropertyView key={property.id} model={model} property={property} />)}
                    </TableBody>
                </Table>
            </div>
          </MuiThemeProvider>

    }
}

// Since putting observer only on the TodoView will result in re-rendering all the todos
// any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
// and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
@observer
export class SinglePropertyView extends React.Component{

    render(){
        const model = this.props.model
        const property = this.props.property


        return <TableRow striped={property.done} displayBorder={false}>
                    <TableRowColumn>
                        <Checkbox checked={property.done} onCheck={e => {property.done = e.target.checked}} />
                    </TableRowColumn>
                    <TableRowColumn>
                        #{property.id}
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField name="text" type="text" value={property.text} onChange={e => {property.text = e.target.value}} fullWidth={true} />
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField name="price" type="text" value={property.price} onChange={e => {property.price = e.target.value}} fullWidth={false} />
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton onClick={() => model.remove(property)} label="Delete" />
                    </TableRowColumn>
                </TableRow>
    }
}
