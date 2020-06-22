import React, {Component} from 'react'
import UserService from '../service/UserService';
import Pagination from "./Pagination";

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            pageOfItems: [],
            message: null
        }

        this.deleteUserClicked = this.deleteUserClicked.bind(this)
        this.updateUserClicked = this.updateUserClicked.bind(this)
        this.addUserClicked = this.addUserClicked.bind(this)
        this.refreshUsers = this.refreshUsers.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        UserService.getAllUsers()
            .then(response => {
                this.setState({users: response.data})
            })
    }

    deleteUserClicked(id, email) {
        UserService.deleteUser(id)
            .then(() => {
                    this.setState({message: `Delete of user with email : ${email} Successful`})
                    this.refreshUsers()
                }
            )
    }

    addUserClicked() {
        this.props.history.push(`/users/add`)
    }

    updateUserClicked(id) {
        this.props.history.push(`/users/${id}`)
    }

    onChangePage(pageOfItems) {
        this.setState({pageOfItems: pageOfItems});
    }

    render() {
        return (
            <div className="container">
                <h3>All Users</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birth Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.pageOfItems.map(
                                item =>
                                    <tr key={item.id}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.updateUserClicked(item.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteUserClicked(item.id, item.email)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <Pagination items={this.state.users} onChangePage={this.onChangePage}/>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addUserClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UsersList