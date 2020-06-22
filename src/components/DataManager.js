import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import ModalForm from './Modal'
import DataTable from './DataTable'

class DataManager extends Component {

  state = {
    editEndpoint: 'https://pkowaleckicarsapi.herokuapp.com/editCar/',
    delEndpoint: 'https://pkowaleckicarsapi.herokuapp.com/deleteCar/',
    apiName: 'Cars',
    apiString: 'https://pkowaleckicarsapi.herokuapp.com/allVechicles',
    items: []
  }

  switchAPI() {
    if (this.state.apiName === 'Cars') {
      this.setState({ apiName: 'Places' })
      this.setState({ delEndpoint: 'https://placowki.herokuapp.com/places/delete/' })
      this.setState({ editEndpoint: 'https://placowki.herokuapp.com/places/editPlace/' })
      this.setState({ apiString: 'https://placowki.herokuapp.com/places/all' }, () => {
        this.getItems()
      })
    }
    else {
      this.setState({ apiName: 'Cars' })
      this.setState({ delEndpoint: 'https://pkowaleckicarsapi.herokuapp.com/deleteCar/' })
      this.setState({ editEndpoint: 'https://pkowaleckicarsapi.herokuapp.com/editCar/' })
      this.setState({ apiString: 'https://pkowaleckicarsapi.herokuapp.com/allVechicles' }, () => {
        this.getItems()
      })

    }

  }

  getItems() {
    axios.get(this.state.apiString)
      //.then(res=>console.log(res))
      .then(res => res.data)
      .then(items => this.setState({ items }))
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

  cleaerItem = item =>{
    let clearedItem=Object.assign({},item)
    for (var key in clearedItem) {
      clearedItem[key]='';
    }
    return clearedItem
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    let exampleItem=this.cleaerItem(this.state.items[0])
    let editEndpoint=this.state.editEndpoint
    return (
      <Container className="crud">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>{this.state.apiName}</h1>
          </Col>
          <Col>
            <Button onClick={this.switchAPI.bind(this)}>Switch data</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} editEndpoint={editEndpoint} delEndpoint={this.state.delEndpoint} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Item" item1={exampleItem}  editEndpoint={editEndpoint} addItemToState={this.addItemToState} />
          </Col>
        </Row>
      </Container>
    )
  }
}
export default DataManager