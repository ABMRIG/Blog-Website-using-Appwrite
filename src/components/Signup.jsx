import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'


function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    const create = async (data) => {
        setError("");
        try {
            // console.log("signup.jsx name: ", data.name);

            // 1. Create account + session
            const session = await authService.createAccount(data);

            if (session) {
                // 2. Get current logged-in user
                const currentUser = await authService.getCurrentUser();

                if (currentUser) {
                    dispatch(login(currentUser));

                    // console.log("signup.jsx userId: ", currentUser.$id);

                    // 3. Save user info in DB
                    await authService.addUserToDatabase(currentUser.$id, data.name, currentUser.email);

                    // 4. Redirect
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block max-w-[100px]'>
                        <Logo width="100%"/>
                    </span>
                </div>
            <h2 className="text-center text-2xl font-bold leading-text">Sign up to create account</h2>
            <p className='mt-2 text-center text-base text-black/60'>Already have an account?&nbsp;
                <Link
                    to="/login"
                    className='font-bold text-primary transition-all duration-200 hover:underline text-[#a729d5]'
                >
                    Sign in
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5 mt-5'>
                    <Input 
                        label="Full name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Email: "
                        placeholder="Enter your email id"
                        type="email"
                        {...register("email",{
                            required: true,
                            validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid  address",
                                }
                        })}
                    />

                    <Input
                        label="Password: "
                        placeholder="Enter a password"
                        type="password"
                        {...register("password",{
                            required: true,
                            validate: {
                                    matchPattern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must be valid",
                                }
                        })}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>

                </div>

            </form>
            </div>
        </div>
    )
}

export default Signup