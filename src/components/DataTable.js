import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'

class DataTable extends Component {

  deleteItem = id => {
    let delRequest = this.props.delEndpoint + id
    fetch(delRequest,{
      method: 'DELETE'
    }
    )
      .then(res => {
        if(res.status%200<100 && res.status<400) alert("Place has been deleted")
        else alert("Place has not been deleted try again or contact with our IT department")
      })
      .then(() => {
              this.props.deleteItemFromState(id)
            })
      .catch(err =>{
        alert("Place has not been deleted try again or contact with our IT department")
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

  render() {
    const items = this.props.items.map(item => {
      const values = this.getValues(item)
      return (
        <tr key={values[0]}>
          <th scope="row">{values[0]}</th>
          {this.putValsInTd(values)}
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} editEndpoint={this.props.editEndpoint} />
              <Button color="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(item.id)}}>Del</Button>
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