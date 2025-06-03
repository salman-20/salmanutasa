import salman from "../Images/salman.jpg";
import "./Mystyle.css";
import { passwordSchema } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassoword } from "../Features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Password = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.users.user.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      datebirth: data.datebirth,
    };
    dispatch(resetPassoword(userData));
  };

  useEffect(() => {
    if (email) {
      navigate("/Home");
    }
  }, [email]);
  return (
    <div>
      <h4 className="cor">Reset Password Form</h4>
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
            id="datebirth"
            name="datebirth"
            type="date"
            {...register("datebirth")}
          />
          <br />
          <br />
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder="Please Enter Password"
            title={errors.password ? errors.password?.message : ""}
            {...register("password")}
          />

          <br />
          <br />
          <button className="submit1" type="submit" name="submit">
            RESET PASSWORD
          </button>
        </form>

        <br />
      </div>
    </div>
  );
};

export default Password;
