import React, { useState, useEffect, useNavigate } from "react"
import { Link, Navigate, Redirect } from "react-router-dom"
// import {history}
import { useFormik } from 'formik'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useLocation } from "react-router-dom"
import { userService } from "../services/user.service"


export const LoginPage = () => {
    // const navigation = useNavigation()
    const location = useLocation()
    // console.log(location)
    return (
        <section className="login-page">
            <div className="login-page-img">
                <img width={300} height={300} src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png' alt='' />
            </div>
            <div className="login-signup">
                <LoginForm/>

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
    handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.log(values)
            userService.login(values)
            
            setSubmitting(false);
        }, 400);
        
    };
    
    render() {
        // console.log(props)
        return (
            <>
                <h1>MyGram</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    // validationSchema={loginSchema}
                    onSubmit={this.handleSubmit}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form className="login-form">
                                <label>
                                    <Field type="email" name="email" className='loginpage-input' placeholder='username or email' />
                                    <ErrorMessage name="email" component="div" />
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
