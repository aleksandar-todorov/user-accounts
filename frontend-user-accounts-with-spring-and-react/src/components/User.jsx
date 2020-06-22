import React, {Component} from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import UserService from '../service/UserService';

class User extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
            date: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.id === "add") {
            return
        }

        UserService.getUser(this.state.id)
            .then(response => this.setState({
                firstName: response.data.firstName || "",
                lastName: response.data.lastName || "",
                email: response.data.email || "",
                date: response.data.date || ""
            }))
            .catch((error) => {
                console.error(error);
            })
    }

    validate(values) {

        let errors = {}

        //FirstName
        if (!values.firstName.trim()) {
            errors.firstName = 'Enter First Name';
        } else if (values.firstName.trim().length < 2 || values.firstName.trim().length > 40) {
            errors.firstName = 'First Name must be between 2 and 40 characters';
        }

        //LastName
        if (!values.lastName.trim()) {
            errors.lastName = 'Enter Last Name';
        } else if (values.lastName.trim().length < 2 || values.firstName.trim().length > 40) {
            errors.lastName = 'Last Name must be between 2 and 40 characters';
        }

        //Email
        if (values.email.trim().length < 6 || values.email.trim().length > 30) {
            errors.email = 'Email must be between 6 and 30 characters';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(values.email.trim())) {
                errors.email = 'Invalid email address pattern';
            }

            //Date
            if (!values.date) {
                errors.date = "Date of birth is required.";
            } else if (new Date(values.date) > new Date()) {
                errors.date = "Date of birth should not be in the future";
            }

            return errors
        }

        onSubmit(values)
        {
            let user = {
                id: this.state.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                date: values.date
            }

            if (user.id === "add") {
                user.id = null;
                UserService.createUser(user)
                    .then(() => this.props.history.push('/users'))
                    .catch((error) => {
                        console.error(error);
                    })
            } else {
                UserService.updateUser(this.state.id, user)
                    .then(() => this.props.history.push('/users'))
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }

        render()
        {

            let {id, firstName, lastName, email, date} = this.state

            return (
                <div>
                    <h3>User</h3>
                    <div className="container">
                        <Formik
                            initialValues={{id, firstName, lastName, email, date}}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}
                        >
                            {
                                () => (
                                    <Form>
                                        <fieldset className="form-group">
                                            <ErrorMessage name="firstName" component="div"
                                                          className="alert alert-danger w-50"/>
                                            <label>First Name*</label>
                                            <Field className="form-control" type="text" name="firstName"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <ErrorMessage name="lastName" component="div"
                                                          className="alert alert-danger w-50"/>
                                            <label>Last Name*</label>
                                            <Field className="form-control" type="text" name="lastName"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <ErrorMessage name="email" component="div"
                                                          className="alert alert-danger w-50"/>
                                            <label>Email*</label>
                                            <Field className="form-control" type="email" name="email"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <ErrorMessage name="date" component="div"
                                                          className="alert alert-danger w-50"/>
                                            <label>Birth Date*</label>
                                            <Field className="form-control" type="date" name="date"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                    <div className="container py-5">
                        <p>*required fields</p>
                    </div>
                </div>
            )
        }
    }

    export
    default
    User