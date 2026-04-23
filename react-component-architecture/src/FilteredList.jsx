import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      type: "All"
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.toLowerCase() });
  }

  onFilter = (eventKey) => {
    this.setState({ type: eventKey });
  }

  filterItem = (item) => {
    const searchMatch = item.name.toLowerCase().search(this.state.search) !== -1;
    
    const typeMatch = this.state.type === "All" || item.type === this.state.type;

    return searchMatch && typeMatch;
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>

        <DropdownButton id="typeDropdown" title={"Type: " + this.state.type} onSelect={this.onFilter}>
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item>
          <Dropdown.Item eventKey="Vegetable">Vegetable</Dropdown.Item>
        </DropdownButton>

        <input type="text" placeholder="Search" onChange={this.onSearch} />

        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;