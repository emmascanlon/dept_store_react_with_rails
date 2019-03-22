import React from 'react'
import { Card, Button, Icon, } from "semantic-ui-react";
import axios from "axios";

class Items extends React.Component {
  state = { items: [], };

 componentDidMount() {
    axios.get(`/api/departments/${this.props.department.id}/items`)
      .then( res => {
        this.setState({ items: res.data, });
      })
  }

  removeItem = (itemid) => {
    axios.delete(`/api/departments/${this.props.department.id}/items/${itemid}`)
    .then( res => {
      const { items } = this.state;
      this.setState({ items: items.filter(e => { if (e.id !== itemid) return e 
      })
      })
    })
  }
  

  renderItems = () => {
    if (this.state.items.length == 0)
    return <h2>No Items to Show</h2>
    return this.state.items.map( item => (
      <Card>
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Meta> {item.price}</Card.Meta>
          <Card.Description> {item.description}</Card.Description>
          <Button icon color="red" onClick ={ () => this.removeItem(item.id)}>
          <Icon name="trash" />
          </Button>
          <Button icon color="blue">
          <Icon name="pencil"/>
          </Button>
        </Card.Content>
      </Card>
    ))}

    render() {
      return (
        <div>
          {this.renderItems()}
        </div>
      )
    }
    

}

export default Items