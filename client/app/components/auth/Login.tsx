import React, { FC, useState } from 'react'
import * as Yup from "yup"
import {useFormik} from "formik"
type Props = {
    setRoute : (route : string)=>void
}
const schema = Yup.object().shape({
    email : Yup.string().email("Invalid email").required("Please enter your email"),
    password : Yup.string().required("Please enter your password").min(6)
})
const Login:FC<Props> = (props) => {
    const [show, setShow] = useState(false)
    const formik = useFormik({
        initialValues : {email:"", password : ""},
        validationSchema : schema,
        onSubmit : async({email,password})=>{
            console.log(email,password);
            
        }
    })
  return (
    <div>Login</div>
  )
}

export default Login