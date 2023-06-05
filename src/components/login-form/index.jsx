import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuthSlice } from "../../lib/slices/auth";

const LoginForm = ({ className }) => {
    const router = useRouter();
    const { login, updateUserData } = useAuthSlice();
    const {
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (submitData) => {
        login(submitData)
            .then((res) => {
                updateUserData(res.data.data);
                localStorage.setItem("access_token", res.data.message);
                router.push("/");
            })
            .catch((e) => {
                const { data } = e.response;
                if (data.password) {
                    setError("password", {
                        type: "server",
                        message: data.password,
                    });
                }
                if (data.email) {
                    setError("email", {
                        type: "server",
                        message: data.email,
                    });
                }
            });
        // e.preventDefault();
        // // eslint-disable-next-line no-console
        // console.log(data);
        // router.push({
        //     pathname: "/",
        // });
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorText>{errors.email?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorText>{errors.password?.message}</ErrorText>
                    )}
                </div>
                <Button type="submit" size="medium" className="mr--15">
                    Log In
                </Button>
                <Button path="/sign-up" color="primary-alta" size="medium">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
