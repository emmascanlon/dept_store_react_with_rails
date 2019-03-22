import React from "react";
import { Card, Header, Button, Icon} from "semantic-ui-react";
import axios from 'axios';
import { Link, } from "react-router-dom";
import DepartmentForm from './DepartmentForm'

class Departments extends React.Component {
  state = { departments: [], editing: false };

  componentDidMount() {
    axios.get("/api/departments")
    .then( res => {
      this.setState({ departments: res.data, });
    })
  }
  
  updateDepartment = (id) => {
    axios.put(`/api/departments/${id}`)
    .then( res => {
      const departments = this.state.departments.map( d => {
        if (d.id === id)
        return res.data
        return d
      });
      this.setState({ departments, });
    })
  }

  removeDepartment = (id) => {
    axios.delete(`/api/departments/${id}`)
    .then( res => {
      const { departments, } = this.state;
      this.setState({ departments: departments.filter(d => { if (d.id !== id) return d 
        })
      })
    })
  }

  toggleForm = () => {
    this.setState({ editing: !this.state.editing})
  }


  renderDepartments = () => {
    const {departments, } = this.state;
    if (departments.length <=0)
    return <h2>No Departments</h2>
    return departments.map( department => (
      <Card key={department.id}>
        <Card.Content>
          <Card.Header>{department.name}</Card.Header>
          { this.state.editing ? <DepartmentForm name={department.name} id={department.id} updateDepartment={this.updateDepartment} editing={this.state.editing}/> : null }
          <Button icon color="blue" onClick={this.toggleForm} >
          <Icon name="pencil" /></Button>
          <Button icon color="red" onClick={ () => this.removeDepartment(department.id)}>
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