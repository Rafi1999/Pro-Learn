import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from?.pathname || '/';
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {

    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = {name : data.name, email : data.email, picture : data.photoURL, role: "student"};
            fetch('https://golingo-server.vercel.app/users',{
              method : 'POST',
              headers : {
                'content-type' : 'application/json'
              },
              body : JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
                }
              })

            // const saveUser = { name: data.name, email: data.email }
            // fetch('https://golingo-server.vercel.app/users', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(saveUser)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.insertedId) {
            //             reset();
            //             Swal.fire({
            //                 position: 'top-end',
            //                 icon: 'success',
            //                 title: 'User created successfully.',
            //                 showConfirmButton: false,
            //                 timer: 1500
            //             });
            //             navigate('/');
            //         }
            //     })
          })
          .catch(error => console.log(error))
      })
  };
  return (
    <>
      <Helmet>
        <title>Pro-Learn | Sign-Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="md:mr-14 w-1/2">

            <img src={"https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-4xl font-bold text-center">Sign Up</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                </div>
                <div className="mb-4">
                  <label className="label">
                    Photo URL
                  </label>
                  <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password"  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[a-z])/
                  })} placeholder="password" className="input input-bordered" />
                  {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                  {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                  {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                  {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case.</p>}

                </div>
                <div className="form-control mt-6">
                  <input className="btn btn-primary" type="submit" value="Sign Up" />
                </div>
              </form>
              <p className='my-4 text-center'>Already have an account? <Link
                className='text-orange-500 font-semibold' to='/login'>Login</Link></p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;