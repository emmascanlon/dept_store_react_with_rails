import React from "react";
import { Card, Header, Button, Icon} from "semantic-ui-react";
import axios from 'axios';
import { Link, } from "react-router-dom";

class Departments extends React.Component {
  state = { departments: [], };

  componentDidMount() {
    axios.get("/api/departments")
    .then( res => {
      this.setState({ departments: res.data, });
    })
  }

  renderDepartments = () => {
    const {departments, } = this.state;
    if (departments.length <=0)
    return <h2>No Departments</h2>
    return departments.map( department => (
      <Card>
        <Card.Content>
          <Card.Header>{department.name}</Card.Header>
          <Button icon color="blue">
          <Icon name="pencil" /></Button>
          <Button icon color="red">
          <Icon name="trash" /></Button>
    
        </Card.Content>
      </Card>
    ))
}

  render() {
    return (
      <div>
        <Header as="h1">Departments</Header>
        <br />
        <Button as={Link} to={"/departments/new"} color="green">Add Department</Button>
        <br />
        <br />
        <Card.Group>
          { this.renderDepartments() }
        </Card.Group>
      </div>
    )
  }
}
export default Departments;