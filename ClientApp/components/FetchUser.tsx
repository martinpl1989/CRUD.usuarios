import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchUserDataState {
    userList: UserData[];
    loading: boolean;
}

export class FetchUser extends React.Component<RouteComponentProps<{}>, FetchUserDataState> {
    constructor() {
        super();
        this.state = { userList: [], loading: true };

        fetch('api/User/Index')
            .then(response => response.json() as Promise<UserData[]>)
            .then(data => {
                this.setState({ userList: data, loading: false });
            });

       // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserTable(this.state.userList);

        return <div>
            <h1>User Data</h1>
            <p>This component demonstrates fetching User data from the server.</p>
            <p>
                <Link to="/addUser">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an User
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete User with Id: " + id))
            return;
        else {
            fetch('api/User/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        userList: this.state.userList.filter((rec) => {
                            return (rec.userId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/User/edit/" + id);
    }

    // Returns the HTML table to the render() method.
    private renderUserTable(userList: UserData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>UserId</th>
                    <th>FullName</th>
                    <th>BirthDate</th>
                    <th>Gender</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {userList.map(user =>
                    <tr key={user.userId}>
                        <td></td>
                        <td>{user.userId}</td>
                        <td>{user.fullName}</td>
                        <td>{user.birthDate}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(user.userId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(user.userId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class UserData {
    userId: number = 0;
    fullName: string = "";
    birthDate: string="";
    gender: string = "";
    email: string = "";
} 