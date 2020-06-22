import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Component } from 'react';

class AddEditForm extends Component {
  state = {
    itemHolder:{},
    editedId:null
  }

  onChange = e => {
    let updateItem= this.state.itemHolder
    updateItem[e.target.name]=e.target.value
    this.setState({itemHolder:updateItem})
  }

  submitFormAdd = e => {
    e.preventDefault()
    console.log(JSON.stringify(this.state.itemHolder))
    fetch(this.props.addEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.itemHolder)
    })
    .then(res =>{
      if(res.status%200<100 && res.status<400){
        this.props.addItemToState(this.state.itemHolder)
        this.props.toggle()
      } else {
        alert("You propably put wrong data type")
      }
    })
    .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(this.props.editEndpoint+this.state.editedId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.itemHolder)
    })
      .then(res => {
        if(res.status%200<100 && res.status<400){
          this.props.updateState(this.state.itemHolder)
          this.props.toggle()
        } else {
          alert("You propably put wrong data type")
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      this.setState({itemHolder:this.props.item})
      this.setState({editedId:this.props.item.id})
    }
  }

  getFieldName = item => {
    let names = []
    for (var key in item) {
      names.push(key);
    }
    return names;
  }

  getFieldVal = item => {
    let vals = []
    for (var key in item) {
      vals.push(item[key]);
    }
    return vals;
  }

  headers = item => {
    const names = this.getFieldName(item);
    const vals = this.getFieldVal(item)
    const labelNames = []

    for (let i=1;i<vals.length;i++) {
      labelNames.push(
        <FormGroup>
          <Label for={names[i]}>{names[i]}</Label>
          <Input type="text" name={names[i]} id={names[i]} onChange={this.onChange} value={vals[i] === null ? '' : vals[i]}/>
        </FormGroup>
      )
    }
    return labelNames;
  }

  render() {
    return (
      <Form onSubmit={this.props.item.id ? this.submitFormEdit : this.submitFormAdd}>
        {this.headers(this.props.item)}
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm