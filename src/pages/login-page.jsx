import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { userService } from "../services/user.service"
import welcome from '../assets/svg/welcome.svg'


export const LoginPage = () => {
    const navigate = useNavigate();
    console.log(navigate)
    return (
        <section className="login-page">
            <div className="login-page-img">
                {/* <img width={300} height={300} src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png' alt='' /> */}
                <img width={400} height={500} src={welcome} alt='' />
            </div>
            <div className="login-signup">
                <LoginForm navigate={navigate} />

            </div>
        </section>
    )
}



export const loginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    // email: Yup.string().email("Invalid email").required("Required")
});

class LoginForm extends React.Component {
    componentDidMount() {
        // console.log(this.props.navigate)
    }

    handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            // console.log(values)
            userService.login(values)





            setSubmitting(false);
        }, 400);
        this.props.navigate('/gram')



    };

    render() {
        // console.log(props)
        return (
            <>
                <h1>MyGram</h1>
                <Formik
                    initialValues={{ emailuser: '', password: '' }}
                    // validationSchema={loginSchema}
                    onSubmit={this.handleSubmit}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form className="login-form">
                                <label>
                                    <Field type="emailuser" name="emailuser" className='loginpage-input' placeholder='username or email' />
                                    <ErrorMessage name="eemailuser" component="div" />
                                </label>
                                <label>

                                    <Field type="password" name="password" placeholder='Password' className='loginpage-input' />
                                    <ErrorMessage name="password" component="div" />
                                </label>
                                <button type="submit" disabled={isSubmitting}>
                                    Log In
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
                <div className="login-link-mainapp">
                    <p >
                        Don't have an account? <Link to={'/signup'} style={{ textDecoration: 'none' }}>
                            <span style={{ color: '#00A2F8' }}>Sign up </span>

                        </Link>
                    </p>
                    <p >
                        continue as <Link style={{ color: '#00A2F8', textDecoration: 'none' }} to={'/gram'}>Guest</Link>
                    </p>
                </div>
            </>
        );
    }
}
