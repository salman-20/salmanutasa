import salman from "../Images/salman.jpg";
import "./Mystyle.css";
import { loginSchema } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../Features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (user) {
      navigate("/Home");
    }
  }, [user]);
  return (
    <div>
      <h4 className="cor">Login Form</h4>
      <div className="register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img src={salman} className="img1" alt="Salman" />
          <br />
          <br />

          <br />
          <input
            className="input"
            id="email"
            name="email"
            type="text"
            placeholder="Please Enter Email"
            title={errors.email ? errors.email?.message : ""}
            {...register("email")}
          />
          <br />
          <br />
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Please Enter Password"
            title={errors.password ? errors.password?.message : ""}
            {...register("password")}
          />
          <br />

          <br />
          <button className="submit1" type="submit" name="submit">
            LOGIN
          </button>
        </form>
        <br />
        <p className="question">
          Don't have an account? &nbsp;
          <a href="/" className="linklog">
            Register
          </a>
        </p>
        <p className="question">
          Forget your password? &nbsp;
          <a href="/Password" className="linklog">
            Reset Password
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
