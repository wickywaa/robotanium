import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch } from "../../Store/hooks";
import { signIn } from "../../Store/Reducers";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { IUserCredentials, emptyLoginForm, currentFields } from "../../Models";
import { useNavigate } from "react-router-dom";
import { userState } from "../../Store/Selectors";
import { useAppSelector } from "../../Store/hooks";

import "./Login.component.scss";

export const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<IUserCredentials>(emptyLoginForm);
  const [currentField, setCurrentField] = useState<currentFields>("email");
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, [e.target.name]: e.target.value });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (currentField === "email") return setCurrentField("password");

    if (currentField === "password") {
      dispatch(signIn({ email: state.email, password: state.password }));
      setState(emptyLoginForm);
    }
  };

  useEffect(() => {
    if (currentField === "password") {
      ref?.current?.focus();
    }
  }, [currentField]);

  useEffect(() => {
    if (user.user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Card className="flex flex-column login-component-card">
      <span className="p-float-label ">
        <InputText
          className="w-full"
          type="email"
          value={state.email}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          name="email"
          autoFocus
          onFocus={() => setCurrentField("email")}
        />
        <label htmlFor="Email">Email</label>
      </span>
      <span className="p-float-label mt-4">
        <InputText
          className="w-full "
          type="password"
          value={state.password}
          onChange={handleChange}
          placeholder="password"
          onKeyPress={handleKeyPress}
          name="password"
          onFocus={() => setCurrentField("password")}
          ref={ref}
        />
        <label htmlFor="Password">Password</label>
      </span>
    </Card>
  );
};
