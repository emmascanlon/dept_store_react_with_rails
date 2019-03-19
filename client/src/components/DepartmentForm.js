import React from 'react';
import {Form, Header, Button} from "semantic-ui-react";
import axios from 'axios';


class DepartmentForm extends React.Component {
  defaultValue = {name: " "};
  state = {...this.defaultValue, };

  handleSubmit = (e) => {
    e.preventDefault();
    const department = { ...this.state, };
    axios.post("/api/departments", department)
    .then( res => {
      this.props.history.goBack();
    })
    this.setState({...this.defaultValues, })
  }

  handleChange = (e) => {
    const { target: {name, value, } } = e;
    this.setState({ [name]: value, })
  }

  render() {
    const {name} = this.state

    return (
      <div>
        <Header as="h1">New Department</Header>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
        <Form.Input
        label="Name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={this.handleChange}
        required />
        </Form.Group>
        <Form.Button color="blue">Submit</Form.Button>
        </Form>
          <br />
          <br />
          <br />
          <br />
        <Button onClick={this.props.history.goBack}color="black">Back</Button>
      </div>
    )
  }
}

export default DepartmentForm;