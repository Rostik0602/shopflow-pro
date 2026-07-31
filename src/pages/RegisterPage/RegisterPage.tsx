import { useState } from "react";
import styles from "./RegisterPage.module.scss";
import type { LoginRequest } from "../../types/auth";
import { useRegisterMutation } from "../../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name as keyof LoginRequest]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await register(form).unwrap();
      dispatch(
        setAuth({ token: result.accessToken, username: result.username }),
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create an account</h1>

        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button type="submit" className={styles.submitButton}>
          Register
        </Button>

        <p className={styles.linkRow}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
