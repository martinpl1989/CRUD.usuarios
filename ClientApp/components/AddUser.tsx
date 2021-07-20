import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserData } from './FetchUser';

interface AddUserDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    userData: UserData;
}

export class AddUser extends React.Component<RouteComponentProps<{}>, AddUserDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList: [], userData: new UserData };

        var UserId = this.props.match.params["UserId"];

        // This will set state for Edit User
        if (UserId > 0) {
            fetch('api/User/Details/' + UserId)
                .then(response => response.json() as Promise<UserData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, userData: data });
                });
        }

        // This will set state for Add User
        else {
            this.state = { title: "Create", loading: false, cityList: [], userData: new UserData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>User</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit User.
        if (this.state.userData.userId) {
            fetch('api/User/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchUser");
                })
        }

        // POST request for Add User.
        else {
            fetch('api/User/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchUser");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchUser");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="UserId" value={this.state.userData.userId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="FullName">FullName</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="fullname" defaultValue={this.state.userData.fullName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.userData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="BirthDate" >BirthDate</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="BirthDate" defaultValue={this.state.userData.birthDate.substring(0, 10)} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Email">Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="email" name="Email" defaultValue={this.state.userData.email} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}