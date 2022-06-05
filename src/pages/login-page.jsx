import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { userService } from "../services/user.service"
import welcome from '../assets/svg/welcome.svg'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../store/actions/user.action"


export const LoginPage = () => {
    const navigate = useNavigate();
    // console.log(navigate)
    return (
        <section className="login-page">
            <div className="login-page-img">
                {/* <img width={300} height={300} src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png' alt='' /> */}
                <img width={450} height={600} src={welcome} alt='' />
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

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // componentDidMount() {
    //     // console.log(this.props.navigate)
    // }

    const handleSubmit = async (values) => {
        const credentials = {
            username: values.username,
            password: values.password

        }
        console.log('credentials', credentials)
        // console.log('data', data)
        debugger
        const loggedin = userService.getLoggedinUser()
        if (loggedin) {
            return
        }

        try {
            dispatch(login(credentials))
            if (loggedin) {
                navigate('/gram')
            }
            // console.log('data is', data)
            // if (!data) return
        }
        catch (err) {
            throw new Error('Wrong credentials')
            console.log(err)
        }

    };


    // console.log(props)
    return (
        <>
            <h1>MyGram</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                // validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {/* {({ isSubmitting }) => { */}
                {() => {
                    return (
                        <Form className="login-form">
                            <label>
                                <Field type="username" name="username" className='loginpage-input' placeholder='username' />
                                <ErrorMessage name="username" component="div" />
                            </label>
                            <label>

                                <Field type="password" name="password" placeholder='Password' className='loginpage-input' />
                                <ErrorMessage name="password" component="div" />
                            </label>
                            {/* <button type="submit" disabled={isSubmitting}> */}
                            <button type="submit">
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
