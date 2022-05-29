import React from "react";
import { Link } from "react-router-dom";

export function WelcomePage() {
    return (
        <section className="welcome-page">
            <h2>My Gram
            </h2>
            <div className="welcome-page-img">
                <img width={500} height={500} src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png' alt='' />
                {/* <h2>Don't have an account? SignUp or continue as a <span style={{textDecoration:'underline'}}>guest</span></h2> */}
                <Link to={'gram'}>
                
                <h2>Don't have an account? SignUp or continue as a guest</h2>
                </Link>
            </div>
        </section>
    )
}