import React, { useState } from "react";
import Axios from "../services/Axios";
import { Link, useNavigate } from "react-router-dom";

import { Container, Form, Button, Alert } from "react-bootstrap";

import { HeaderPreLogin } from "../components/HeaderPreLogin";

import "../css/line.css";

export const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setisError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function handelLogin() {
    try {
      const res = await Axios.post("/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.status == "ok") {
        localStorage.setItem("token", res.data.token);
        console.log("Login Success!");
        navigate("../home", { replace: true });
      }
    } catch (error) {
      console.log(error.response.data);
      setisError(true);
      setErrMsg(error.response.data.message);
    }
  }

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handelLogin();
    }
  };

  return (
    <>
      <HeaderPreLogin />

      <Container fluid="md">
        <Form
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <h2 className="ms-7 ">Login</h2>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={handleKeypress}
            />
          </Form.Group>
          {isError && <Alert variant="danger">{errMsg}</Alert>}
          <Button
            variant="primary"
            type="button"
            className="mb-2 w-100"
            onClick={handelLogin}
          >
            Login
          </Button>
          <div className="linetext mb-2 text-muted">&ensp; Or &ensp; </div>
          <Button
            variant="success"
            type="button"
            className="mb-2 w-100"
            as={Link}
            to={"/register"}
          >
            Create New Account
          </Button>
        </Form>
      </Container>
    </>
  );
};

// <Container fluid="sm">Login</Container>
