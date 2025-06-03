import "./Mystyle.css";
import salman from "../Images/salman.jpg";
import { registrationSchema } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../Features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.users.user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      datebirth: data.datebirth,
    };
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (email) {
      navigate("/Home");
    }
  }, [email]);

  return (
    <div>
      <div>
        <h4 className="cor">Registration Form</h4>
      </div>
      <div class="register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img src={salman} className="img1" />
          <br></br>
          <br></br>
          <input
            className="input"
            id="name"
            name="name"
            type="text"
            placeholder="Please Enter Full Name"
            title={errors.name ? errors.name.message : ""}
            {...register("name")}
          />

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

          <input
            className="input"
            id="password"
            name="password"
            type="text"
            placeholder="Please Enter Password"
            title={errors.password ? errors.password?.message : ""}
            {...register("password")}
          />

          <br />
          <input
            className="input"
            id="datebirth"
            name="datebirth"
            type="date"
            {...register("datebirth")}
          />
          <br />

          <br />

          <button className="submit1" type="submit" name="submit">
            SUBMIT
          </button>
        </form>
        <p className="question">
          Already have an account ?{" "}
          <a href="/Login" className="linklog">
            {" "}
            Login{" "}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
