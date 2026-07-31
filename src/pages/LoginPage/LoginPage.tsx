import { useState } from "react";
import styles from "./LoginPage.module.scss";
import type { LoginRequest } from "../../types/auth";
import { useLoginMutation } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import Button from "../../components/Button/Button";

export default function LoginPage() {
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name as keyof LoginRequest]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await login(form).unwrap();
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
        <h1 className={styles.title}>Welcome back</h1>

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
          Войти
        </Button>
      </form>
    </div>
  );
}
