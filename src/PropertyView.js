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
        // const model = this.props.model
        const models = this.props.models



        function renderProperty( models, modelKey, model ) {
          if ( model.property !== null ) {
             return <SinglePropertyView models={models} modelKey={modelKey} key={model.property.id} keyGun={model.propertyKey} model={model} property={model.property} />
           }
        }

        function renderMatchedList( items, model ) {
          var element= [];
          items.forEach( (property, keyID) => element.push(<SingleMatchedPropertyView key={property.id} keyGun={keyID } model={model} property={property} />) )
          return <div>{element}</div>
        }

        // render single property model
        function propertyBox( models, modelKey, model, title , count) {

          return <div key={count}>
                 <h3>- User:[{model.user.name}] -- Property Box {title} ------------------- </h3>
                 {renderProperty( models, modelKey, model )}
                 <h5>           ------ Status ------                    </h5>
                 <SinglePropertyStatusView model={model}/>
                 <h3>----------------- Matched Property --------------- </h3>
                 {renderMatchedList(model.matchedList, model)}
                 <hr></hr>
                 </div>
        }

        // render mutli property models
        function renderPropertyBox( models ) {

          if ( models.models.size > 0 ) {
             var elements = []
             var count = 0;

             models.models.forEach( (model, modelKey) => {
               elements.push(propertyBox( models, modelKey, model , model.typeTo,  count++) )
             })

             return <div>
                    {elements}
                    </div>
          } else {
           return <div>
             <h3>models is empty </h3>
           </div>
      }
        }

        // just some HTML markup based of the ViewModel data.
        return <div>
            <h1>React & MobX Property List! User: {models.userName}</h1>
            <p>
            </p>
            <p>
                <button onClick={() => model.load()}>Reload Propertys</button>
                <button onClick={() => model.save()}>Save Propertys</button>
                <button onClick={() => models.clear()}>clear gundb</button>
                <button onClick={() => model.addNewWrap()}>addNewWrap</button>
                <button onClick={() => model.login('gordon')}>Gordon</button>
                <button onClick={() => model.login('jeff')}>Jeff</button>
                <button onClick={() => model.login('lala')}>Lala</button>
                <button onClick={() => model.login('may')}>may</button>
                <button onClick={() => model.login('mac')}>mac</button>
                </p>
                  <SingleCreateCase model={models} userName={'gordon'} name={'#01'} location={'shatin'} typeTo={'sell'} typeBy={'forSellBy'} typeFor={'buy'} price={'999'} />
                  <SingleCreateCase model={models} userName={'jeff'} name={'#02'} location={'ma on sha'} typeTo={'buy'} typeBy={'forBuyBy'} typeFor={'sell'} price={'999'} />
                  <SingleCreateCase model={models} userName={'lala'} name={'#03'} location={'shatin'} typeTo={'buy'} typeBy={'forBuyBy'} typeFor={'sell'} price={'999'} />
                  <SingleCreateCase model={models} userName={'peter'} name={'#04'} location={'shatin'} typeTo={'buy'} typeBy={'forBuyBy'} typeFor={'sell'} price={'999'} />
                  <SingleCreateCase model={models} userName={'mac'} name={'#05'} location={'shatin'} typeTo={'lease'} typeBy={'forLeaseBy'} typeFor={'rent'} price={'999'} />
                  <SingleCreateCase model={models} userName={'Machel'} name={'#06'} location={'shatin'} typeTo={'rent'} typeBy={'forRentBy'} typeFor={'lease'} price={'999'} />
                  <SingleCreateCase model={models} userName={'gordon'} name={'#07'} location={'shatin'} typeTo={'sell'} typeBy={'forSellBy'} typeFor={'buy'} price={'999'} />
                  <SingleCreateCase model={models} userName={'jeff'} name={'#08'} location={'ma on sha'} typeTo={'buy'} typeBy={'forBuyBy'} typeFor={'sell'} price={'999'} />
                  <SingleCreateCase model={models} userName={'lala'} name={'#09'} location={'shatin'} typeTo={'buy'} typeBy={'forBuyBy'} typeFor={'sell'} price={'999'} />
                  <SingleCreateCase model={models} userName={'peter'} name={'#10'} location={'shatin'} typeTo={'buy'} typeBy={'forBuyBy'} typeFor={'sell'} price={'999'} />
                  <hr></hr>
                  { renderPropertyBox( models )}
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
        const {property, keyID, keyGun, model, models, modelKey } = this.props;
        //const key = this.props.key

        //console.log( 'key ', key )

        return <div>
               <p>   {keyID}
                    <input size="10" type="checkbox" checked={property.done} onChange={e => {property.done = e.target.checked}} />
                    <input size="10" type="text" value={property.name} onChange={e => {property.name = e.target.value}} />
                    <input size="10" type="text" value={property.location} onChange={e => {property.location = e.target.value}} />
                    <input size="10" type="text" value={property.typeTo} onChange={e => {property.typeTo = e.target.value}} />
                    <input size="10" type="text" value={property.price} onChange={e => {property.price = e.target.value}} />
                    {keyGun}
                </p>
                <div>
                <button onClick={() => models.delete(modelKey)}>Delete</button>
                </div>
        </div>
    }
}

// Since putting observer only on the TodoView will result in re-rendering all the todos
// any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
// and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
@observer
export class SingleCreateCase extends React.Component{

    render(){
        //const model = this.props.model
        var {userName, name, location, typeTo, typeBy, typeFor, price, model} = this.props;
//        <input size="10" type="text" value={userName} onChange={e => { userName = e.target.value}} />

        return (<div>
                    <input size="10" type="text" value={name} onChange={e => { name = e.target.value}} />
                    <input size="10" type="text" value={location} onChange={e => { location = e.target.value}} />
                    <input size="10" type="text" value={typeTo} onChange={e => { typeTo = e.target.value}} />
                    <input size="10" type="text" value={typeBy} onChange={e => { typeBy = e.target.value}} />
                    <input size="10" type="text" value={typeFor} onChange={e => { typeFor = e.target.value}} />
                    <input size="10" type="text" value={price} onChange={e => { price = e.target.value}} />
                    <button onClick={() => model.create(userName, name, location, typeTo, typeBy, typeFor, price )}>Create Case</button>
           </div>)
    }
}


// Since putting observer only on the TodoView will result in re-rendering all the todos
// any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
// and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
@observer
export class SingleMatchedPropertyView extends React.Component{

    render(){
        //const model = this.props.model
        const {property, keyID, keyGun, model} = this.props;
        //const key = this.props.key

        //console.log( 'key ', key )

        return <div>
               <p>{keyID}{property.text}
                    <input size="10" type="checkbox" checked={property.done} onChange={e => {property.done = e.target.checked}} />
                    <input size="10" type="text" value={property.name} onChange={e => {property.name = e.target.value}} />
                    <input size="10" type="text" value={property.location} onChange={e => {property.location = e.target.value}} />
                    <input size="10" type="text" value={property.typeTo} onChange={e => {property.typeTo = e.target.value}} />
                    <input size="10" type="text" value={property.price} onChange={e => {property.price = e.target.value}} />
                    {keyGun}
                </p>
        <button onClick={() => model.likeGun( keyGun )}>Like</button>
        <button onClick={() => model.rejectGun( keyGun )}>Reject</button>
        <button onClick={() => model.likeGun( keyGun )}>View</button>
        </div>
    }
}


// Since putting observer only on the TodoView will result in re-rendering all the todos
// any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
// and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
@observer
export class SinglePropertyStatusView extends React.Component{

    render(){
        //const model = this.props.model
        const {model} = this.props;
        //const key = this.props.key

        //console.log( 'key ', key )

        return <div>
                 <p>
                    Matched {model.matchedList.size}, Like {model.like.size}, reject {model.reject.size}, view { model.view.size }
                </p>
        </div>
    }
}
