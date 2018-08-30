import React, { Component } from "react"
import axios from "axios"
import { Dialog } from './Dialog';
import { User } from './User';
import { INITIAL_USERS, USERS_API } from './Constants';
import { Pagination } from './Pagination';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: INITIAL_USERS,
      modalIsOpen: false,
      selectedUser: null,
      pageNumbers: [],
      firstTimeLoaded: true,
      currentPageNumber: 1
    };
  }

  componentDidMount() {
    this.jsonList(this.state.currentPageNumber);
  }

  removeDuplicateUsers(usersToFilter) {
    const obj = {} , filteredData = [];
    for (let i=0;i < usersToFilter.length; i++)
      obj[usersToFilter[i]['id']] = usersToFilter[i];
    for (var key in obj)
      filteredData.push(obj[key]);
    return filteredData;
  }

  jsonList(pagenumber) {
    axios.get(USERS_API,{
      params: {
        page: pagenumber,
        per_page: 10
      }
    })
    .then((response)=> {
      this.setState((prevState) => {
        let userdata;
        userdata = this.state.firstTimeLoaded ? prevState.users.concat(response.data.data) : response.data.data ;
        const pageNumbers = []; 
        for(let i=1 ; i <= response.data.total_pages ; i++){
          pageNumbers.push(i)
        }
        return {
          users: this.removeDuplicateUsers(userdata),
          pageNumbers: pageNumbers

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

  handlePagination(pagenumber) {
    this.setState({
      firstTimeLoaded: false,
    })
    this.jsonList(pagenumber);
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
        <div className="users-pagination">
          {
            this.state.pageNumbers.map((number) => {
              return (
                <Pagination 
                  key={number} 
                  id={number} 
                  handlePagination ={this.handlePagination.bind(this,number)}
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