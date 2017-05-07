import React from 'react'
import {observer} from 'mobx-react'


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

        var kk = new Map();
        var element = [];

        kk.set( 123, {
            id: 123,
            text: 'text',
            done: false,
            price : 33,
            location : 'location',
            type: 'sale',
            isAgent: false,
            createdAt: 133
        } )

        function lookFor( items ) {
          items.forEach( (property, keyID) => element.push(<SinglePropertyView keyID={keyID} model={model} property={property} />) )
          return <div>{element}</div>
        }

        // just some HTML markup based of the ViewModel data.
        return <div>
            <h1>React & MobX Property List!</h1>
            <p>
                <button onClick={() => model.add()}>New Property</button>
                <button onClick={() => model.load()}>Reload Propertys</button>
                <button onClick={() => model.save()}>Save Propertys</button>
                <button onClick={() => model.clear()}>clear gundb</button>
                </p>
                {lookFor(model.propertys)}
        </div>
    }
}

// Since putting observer only on the TodoView will result in re-rendering all the todos
// any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
// and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
@observer
export class SinglePropertyView extends React.Component{

    render(){
        //const model = this.props.model
        const {property, keyID, model} = this.props;
        //const key = this.props.key

        //console.log( 'key ', key )

        return <div>
               <p>
                    <input type="checkbox" checked={property.done} onChange={e => {property.done = e.target.checked}} />
                    {property.text} <input type="text" value={property.text} onChange={e => {property.text = e.target.value}} />
                    <input type="text" value={property.location} onChange={e => {property.location = e.target.value}} />
                    <input type="text" value={property.type} onChange={e => {property.type = e.target.value}} />
                    <input type="text" value={property.price} onChange={e => {property.price = e.target.value}} />
                    <br />
                    {keyID}
                </p>
        <button onClick={() => model.save()}>Save</button>
        <button onClick={() => model.remove(keyID)}>Delete</button>
        <button onClick={() => model.update(keyID, property)}>Update</button>
        </div>
    }
}
