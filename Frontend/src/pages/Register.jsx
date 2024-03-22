import styled from "styled-components";
import axios from 'axios';
import React, { useState } from 'react';
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
console.log(formData)
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      setError('Please agree to the terms and conditions');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make API call to register user
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data); // Assuming API returns some response data
      // Handle successful registration (e.g., redirect user, show success message)
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (e.g., show error message)
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleRegister}>
          <Input
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            placeholder="last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Agreement>
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
            />
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;