import React from "react"

export class User extends React.PureComponent {
    render() {
        const {
            user,
            onOpenDialog,
        } = this.props;

        return (
            <div className="users-thumbnail">
                <img className="users-image" src={user.avatar}></img>
                <div className="users-name">{user.first_name} {user.last_name}</div>
                <div className="users-deletebtn">
                    <a onClick={onOpenDialog}>Delete</a>
                </div>
            </div>
        );
    }
}
