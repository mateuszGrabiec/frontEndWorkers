import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PlaceTable from './PlaceTable'

class PlaceManager extends Component {

    state = {
        items: [],
        places: []
      }

      groupByPlaceId = cars => cars.reduce(function(results, car) {
        (results[car.placeId] = results[car.placeId] || []).push(car);
        return results;
    }, {})

      getPlaces(){
        fetch('https://placowki.herokuapp.com/places/all')
        .then(res => res.json())
        .then(places=>this.getItems(places))
        .catch(err=>{
          console.log(err)
        })
      }
    
    
      getItems = places =>  {
        for(let i=0 ; i < places.length;i++){
          fetch('https://placowki.herokuapp.com/places/cars/all/'+places[i].id)
          .then(res=>res.json())
          .then(cars=>{
            places[i].cars=[]
            places[i].cars=cars
          })
          .catch(err => console.log(err))
        }
        this.setState({places:places},()=>{
          this.setState({items:places})
         })
      }
    
      addItemToState = (item) => {
        this.setState(prevState => ({
          items: [...prevState.items, item]
        }))
      }
    
      updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
          // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
          // add the updated item to the array
          item,
          // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
      }
    
      deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
      }

      componentDidMount(){
        this.getPlaces()
      }

      render() {
        return (
          <Container className="crud">
            <Row>
              <Col>
                <h1 style={{ margin: "20px 0" }}>Places with cars</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <PlaceTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
              </Col>
            </Row>
          </Container>
        )
      }
}

export default PlaceManager