import styled from "styled-components";
import {mobile} from "../responsive";
import React, { useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make API call to authenticate user
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('session',JSON.stringify(response.data))
      console.log(response.data); // Assuming API returns some response data
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password'); // Update error messag
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleLogin}>
          <Input
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link to="/register">CREATE A NEW ACCOUNT</Link> {/* Assuming you have a registration page */}
        </Form>
      </Wrapper>
    </Container>
  );
};


export default Login;