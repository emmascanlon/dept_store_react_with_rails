import React from 'react';
import axios from 'axios';
import {Button, Header, Icon } from "semantic-ui-react";
import {Link} from "react-router-dom"
import Items from './Items'
import ItemForm from './ItemForm'

class DepartmentView extends React.Component {
  state= { department: {}, showItems: false, addItem: false, };

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
    .then( res => {
      this.setState({ department: res.data, });
    })
  }

  toggleItems = () => (
    this.setState({ showItems: !this.state.showItems})
  )
  toggleAdd = () => (this.setState({addItem: !this.state.addItem}) )

render() {
  const {department} = this.state
  return (
    <div>
      <Header as="h1">Department: { department.name }</Header>
        <Button onClick={this.toggleItems} color="olive">
        {this.state.showItems ? "Hide Items" :
          "View Items" }
        </Button>
        <Button icon color="violet" >
          <Icon name="pencil" /></Button>
        <Button icon color="yellow">
          <Icon name="trash" />
        </Button>
        <Button color = "green" onClick={this.toggleAdd}>{this.state.addItem ? "Hide Form" :"Add Item"}
        </Button>
        <br />
        <br />
        {this.state.addItem ? <ItemForm toggleAdd={this.toggleAdd} department={this.state.department}/> : null }
        {this.state.showItems ? <Items department={this.state.department}/> : null }
    </div>
  )
}
}

export default DepartmentView