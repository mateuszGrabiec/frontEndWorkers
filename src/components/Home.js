import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col } from 'reactstrap';
import ModalForm from './Modal'
import DataTable from './DataTable'

class Home extends Component {

    state = {
        headers: [""],
        items: []
      }
    
      getItems(){
        axios.get('https://pkowaleckicarsapi.herokuapp.com/allVechicles')
          .then(res=>res.data)
          .then(items => this.setState({items}))
          .catch(err => console.log(err))
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
        this.getItems()
      }

    render() {
        return (
          <Container className="crud">
            <Row>
              <Col>
                <h1 style={{margin: "20px 0"}}>CRUD person</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
              </Col>
            </Row>
            <Row>
              <Col>
                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
              </Col>
            </Row>
          </Container>
        )
      }
}
export default Home