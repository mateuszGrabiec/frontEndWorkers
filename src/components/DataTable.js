import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      fetch('http://localhost:3000/crud', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }

  }

  getFieldName = item => {
    let names = []
    for (var key in item) {
      names.push(key);
    }
    return names;
  }

  headers = ()=> {
    let oneItem =this.props.items[0];
    let names = this.getFieldName(oneItem);
    const tdNames = []

    for (const [index, value] of names.entries()) {
      tdNames.push(<td key={index}>{value}</td>)
    }
    return tdNames; 
  }

  getValues = item =>{
      let values = []
      for (const value in item){
        values.push(item[value])
      }
      return values
  }

  putValsInTd = values=>{
    let valTd=[]
    for(let i=1;i<values.length;i++){
      valTd.push(<td key={i}>{values[i]}</td>)
    }
    return valTd
  }

  render() {

    const items = this.props.items.map(item => {
      const values = this.getValues(item)
      return (
        <tr key={values[0]}>
          <th scope="row">{values[0]}</th>
          {this.putValsInTd(values)}
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
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

export default DataTable