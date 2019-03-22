import React from 'react'
import {Form, Header, Button, } from "semantic-ui-react"
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class ItemForm extends React.Component {
  defaultValues = {name: "", description: "", price: "", }
  state={ name: "", 
        description: "", 
        price: ""}

  handleSubmit = (e) => {
    debugger
    e.preventDefault();
    const item = { ...this.state, };
    
    axios.post(`/api/departments/${this.props.department.id}/items`, item)
    .then( res => {
      this.props.history.push();
    })
    this.setState({...this.defaultValues, })
    this.props.toggleAdd();
  }

  handleChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value, })
  }

  render() {
    return (
      <div>
        <Header>Add New Item</Header>
         <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
        <Form.Input
        label="Name"
        name="name"
        placeholder="Name"
        value={this.state.name}
        onChange={this.handleChange}
        required />
         <Form.Input
        label="Description"
        name="description"
        placeholder="Description"
        value={this.state.description}
        onChange={this.handleChange}
        required />
         <Form.Input
        label="Price"
        name="price"
        placeholder="Price"
        value={this.state.price}
        onChange={this.handleChange}
        required />
        </Form.Group>
        <Form.Button color="blue">Submit</Form.Button>
        </Form>

      </div>
    )
  }

}

export default withRouter (ItemForm)