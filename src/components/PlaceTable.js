import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

class PlaceTable extends Component {

  constructor (props) {
    super(props)
     this.getCarsById = this.getCarsById.bind(this)
  }

  deleteItem = id => {
    let delRequest = this.props.delEndpoint + id
    fetch(delRequest, {
      method: 'DELETE'
    }
    )
      .then(res => {
        if (res.status % 200 < 100 && res.status < 400) alert("Object has been deleted")
        else alert("Object has not been deleted try again or contact with our IT department")
      })
      .then(() => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => {
        alert("Object has not been deleted try again or contact with our IT department")
        console.log(err)
      })
  }

  getFieldName = item => {
    let names = []
    for (var key in item) {
      names.push(key);
    }
    return names;
  }

  headers = () => {
    let oneItem = this.props.items[0];
    let names = this.getFieldName(oneItem);
    const tdNames = []

    for (const [index, value] of names.entries()) {
      tdNames.push(<td key={index}>{value}</td>)
    }
    return tdNames;
  }

  getValues = item => {
    let values = []
    for (const value in item) {
      values.push(item[value])
    }
    return values
  }

  putValsInTd = values => {
    let valTd = []
    for (let i = 1; i < values.length; i++) {
      valTd.push(<td key={i}>{values[i]}</td>)
    }
    return valTd
  }

  getCars=carsIds=>{
    let cars=[]
    for(let i=0;i<carsIds.length;i++){
      fetch('https://pkowaleckicarsapi.herokuapp.com/getVechicleDetails/'+carsIds[i])
      .then(res=>res.json())
      .then(car=>cars.push(car))
      .catch(err=>console.log(err))
    }
    console.log(cars)
    return cars
  }


  getCarsById = place => {
    fetch('https://placowki.herokuapp.com/places/cars/all/' + place.id)
      .then(res => res.json())
      .then(cars => {
        const carsIds= cars.map((car) => car.id)
        return this.getCars(carsIds)
      })
      .catch(err => console.log(err))
  }

  render() {
    const items = this.props.items.map((item) => {
      const values = this.getValues(item)
      const cars=this.getCarsById(item)
      console.log(cars)
      return (
        <tr key={values[0]}>
          <th scope="row">{values[0]}</th>
          {this.putValsInTd(values)}
          {cars}
          <td>
            <div style={{ width: "110px" }}>
              <Button color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(item.id) }}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })
    return (
      <Table responsive hover>
        <thead>
          <tr>
            {this.headers()}
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default PlaceTable