import React from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import { Link } from "react-router-dom";
import { userService } from "../services/user.service";
import { signup } from "../store/actions/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';



export const SignUp = () => {
    return <section className='signUp'>
        <App />
    </section>
}

const RegisterValidation = object().shape({
    fullname: string().required("Required"),
    email: string()
        .required("Valid email required")
        .email("Valid email required"),
    password: string().min(8, "Required").required("Required"),
    // confirmPassword: string()
    //     .required("Please confirm your password")
    //     .oneOf([ref("password")], "Passwords do not match"),
});

const Input = ({ name, label, ...props }) => {
    const [field, meta] = useField(name);
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold" htmlFor={field.name}>

            </label>
            <input
                className={`${meta.error && meta.touched ? "border-red-500" : ""
                    } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                {...field}
                {...props}
            />
            <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-xs"
            />
        </div>
    );
};

const App = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (values) => {
        console.log(values);
        const user = {
            fullname: values.fullname,
            username: values.username,
            password: values.password,
            // email: values.email
        }
        // console.log(user)
        const loggedin = userService.getLoggedinUser()
        console.log(loggedin)
        try {
            dispatch(signup(user))
                (navigate('/gram'))
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="signup h-screen flex items-center justify-center flex-col bg-gray-100">
            <h1>My Gram</h1>
            <p>Sign up to see photos and videos from your friends</p>
            <Formik
                initialValues={{
                    fullname: "",
                    username: '',
                    email: "",
                    password: "",
                    // confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={RegisterValidation}
            >
                {() => {
                    return (
                        <Form className="signup-form bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
                            <Input className='signin-input' name="email" label="Email" placeholder='Email' />
                            <Input className='signin-input' name="fullname" label="Fullname" placeholder='Full Name' />
                            <Input className='signin-input' name="username" label="Username" placeholder='Username' />
                            <Input className='signin-input' name="password" label="Password" type="Password" placeholder='Password' />
                            {/* <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                            /> */}
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            <div className="login-link-mainapp">
                <p style={{ fontSize: '0.9em', margin: '5px', color: '#262626' }}>
                    Have an account? <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <span style={{ color: "#262626" }}>Log in</span>

                    </Link>
                </p>
            </div>
        </div>
    );
}

