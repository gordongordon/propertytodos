import React from 'react'
import {observer} from 'mobx-react'


// This is a React component.
// The property "model" of the passed props object is an instance of our TodoViewModel class.
// do you remember all those @observable and @computed?
// In order to let your React component automatically update whenever any of
// those observable property of an object in the component props update,
// you should pass your component to the "observer" function/decorator
@observer
export class SaleHomeView extends React.Component{

    render(){
        const model = this.props.model

        // just some HTML markup based of the ViewModel data.
        return <div>
            <h1>React & MobX Sale Home Property List!</h1>
            <p>
                <button onClick={() => model.add()}>New Property</button>
                <button onClick={() => model.load()}>Reload Propertys</button>
                <button onClick={() => model.save()}>Save Propertys</button>
            </p>
            {model.propertys.map((property, i) => <SingleSaleHomeView key={property.id} model={model} property={property} />)}
        </div>
    }
}

// Since putting observer only on the TodoView will result in re-rendering all the todos
// any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
// and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
@observer
export class SingleSaleHomeView extends React.Component{

    render(){
        const model = this.props.model
        const property = this.props.property

        return <p>
                    #{property.id}
                    <strong>{property.text}</strong>
                    <i>{property.done ? 'DONE!' : ''}</i>

                    <br/>

                    <input type="checkbox" checked={property.done} onChange={e => {property.done = e.target.checked}} />
                    <input type="text" value={property.text} onChange={e => {property.text = e.target.value}} />
                    <input type="text" value={property.location} onChange={e => {property.location = e.target.value}} />
                    <input type="text" value={property.price} onChange={e => {property.price = e.target.value}} />
                    <input type="text" value={property.type} onChange={e => {property.type = e.target.value}} />
                    <button onClick={() => model.remove(property)}>Delete</button>
                </p>
    }
}
