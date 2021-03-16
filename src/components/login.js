import styled from 'styled-components'
import {
  Input,
  Text,
} from './basics'

const Form = styled.div`
  width: 30%;
  float: right;
  position: fixed;
  top: 25%;
  left: 50%;

  width: 300px;
  margin-left: -200px;
  border: 2px solid ${props => props.theme.colors.darkBlue};
  border-radius: 10px;
  padding: 50px;
`

const Label = styled.form`
  margin-top: 1em;
  font-size: 1.2em;
  font-weight: bold;
`


function Login(props) {
  console.log(props)
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
      {props.usernameError && <Text error>Incorrect username</Text>}
      <Label>Password</Label>
      <br/>
      <Input
        onChange={ props.handlePasswordChange }
        type="password"
        value={ props.password }
      />
      <br/>
      {props.passwordError && <Text error>Incorrect password</Text>}
      <Input
        button
        submit
        onClick={ props.handleSubmit }
        type="submit"
        value="Login"
      />
      <Input
        button
        cancel
        onClick={ props.handleCancel }
        type="button"
        value="Cancel"
      />
    </Form>
  )
}

export default Login
