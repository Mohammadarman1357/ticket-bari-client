import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {

    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, forgetPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // get email by usewatch
    const userEmail = useWatch({ control, name: 'email' });

    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your has been Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleForgetPassword = () => {
        // console.log(userEmail);

        if (!userEmail) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter Your Email!",
            });
            return;
        }

        forgetPassword(userEmail)
            .then(() => {

                Swal.fire({
                    title: "Please check your Email to reset your password.",
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(/images/trees.png)",
                    backdrop: `rgba(0,0,123,0.4) url("/images/nyan-cat.gif") left top no-repeat`
                });
            })
            .catch(error =>
                console.log(error)
            )
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center font-bold mt-8">Welcome Back</h3>
            <p className='text-center'>Login with Ticket Bari</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p
                            className='text-red-500'>
                            Email is required
                        </p>
                    }


                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />

                    {
                        errors.password?.type === 'minLength' && <p
                            className='text-red-500'>
                            Password must be 6 characters or longer.
                        </p>
                    }

                    <div onClick={handleForgetPassword}><a className="link link-hover text-[#71717A]">Forgot password?</a></div>
                    <button className="btn btn-primary text-secondary mt-4">Login</button>
                </fieldset>
                <p className='text-[#71717A] mr-2'>Don't have any account?
                    <Link state={location?.state} className='text-green-600 link-hover' to="/register">Register</Link>
                </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;