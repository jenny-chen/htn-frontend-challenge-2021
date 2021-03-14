import styled, { css } from 'styled-components'
// import {
//   Form,
//   Label,
//   Input,
// } from './basics'

const Form = styled.form`
  width: 30%;
  float: right;
  position: fixed;
  top: 40%;
  left: 50%;

  width: 300px;
  margin-left: -150px;
`

const Label = styled.form`
  margin-top: 1em;
`

const Input = styled.input`
  width: 97%;

  ${props => props.submit && css`
    width: 100%;
  `}
`

function Login(props) {
  return (
    <Form>
      <Label>Username</Label>
      <br/>
      <Input
        onChange={ props.handleUsernameChange }
        type="text"
        value={ props.username }
      />
      <br/>
      <Label>Password</Label>
      <br/>
      <Input
        onChange={ props.handlePasswordChange }
        type="password"
        value={ props.password }
      />
      <br/>
      <Input
        submit
        onClick={ props.handleSubmit }
        type="submit"
        value="Login"
      />
    </Form>
  )
}

export default Login
