import React, { Component } from "react"
import axios from "axios"
import { Dialog } from './Dialog';
import { User } from './User';
import { INITIAL_USERS, USERS_API } from './Constants';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: INITIAL_USERS,
      modalIsOpen: false,
      selectedUser: null,
    };
  }

  componentDidMount() {
    this.jsonList();
  }

  removeDuplicateUsers(usersToFilter) {
    const obj = {} , filteredData = [];
    for (let i=0;i < usersToFilter.length; i++)
      obj[usersToFilter[i]['id']] = usersToFilter[i];
    for (var key in obj)
      filteredData.push(obj[key]);
    return filteredData;
  }

  jsonList() {
    axios.get(USERS_API)
    .then((response)=> {
      this.setState((prevState) => {
        const userdata = prevState.users.concat(response.data.data); 
          return {
            users: this.removeDuplicateUsers(userdata),
          };
      });
    })
  }

  openDialog(user) {
    this.setState({
      modalIsOpen: true,
      selectedUser: user,
    });
  }

  closeDialog() {
    this.setState({
      modalIsOpen: false,
    });
  }

  //functionality to delete users 
  deleteUser(){
    const data = this.state.users.filter(i => i.id !== this.state.selectedUser.id)
    this.setState(() => {
      return {users: data};
    })
    this.closeDialog();
  }

  render() {
    return (
      <div className="users">
        <div className="users-header">Pearson User Management</div>
        <div className="users-list">
          { 
            this.state.users.map(user => {
              return (
                <User
                  key={user.id}
                  user={user}
                  onOpenDialog={this.openDialog.bind(this, user)}
                />
              )
            })
          }
        </div>
        <Dialog
          isOpen={this.state.modalIsOpen}
          onDeleteUser={this.deleteUser.bind(this)}
          onCloseDialog={this.closeDialog.bind(this)}
        />
      </div>
    );
  }
}