
import React, { useEffect } from 'react'
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from '@/features/api/authapi'
import { toast } from 'sonner';

const Login = () => {

  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" })
  const [loginInput, setLoginInput] = useState({ email: "", password: "" })

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();

  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value })
    } else {
      setLoginInput({ ...loginInput, [name]: value })
    }
  }

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput
    const action = type === "signup" ? registerUser : loginUser
    await action(inputData);
  }

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success( registerData?.message ||"Signup Successful.")
    }
    
    if (registerError) {
      toast.error( registerData?.data?.message ||"Signup failed.")
    }

    if (loginIsSuccess && loginData) {
      toast.success( loginData?.message ||"Login Successful.")
    }

    if (loginError) {
      toast.error( loginData?.data?.message ||"Login failed.")
    }
  }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])
  



  return (
    <div className="flex justify-center w-full items-center">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}

                  type="text"
                  placeholder="Enter your name"
                  required="true" />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="email"
                  placeholder="Enter your email"
                  required="true" />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="password"
                  placeholder="Enter your password"
                  required="true" />
              </div>
            </CardContent>
            <CardFooter>


              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : "Signup"
                }
              </Button>


            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup , you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="email"
                  placeholder="Enter your email"
                  required="true" />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="password"
                  placeholder="Enter your password"
                  required="true" />
              </div>
            </CardContent>
            <CardFooter>


              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : "Login"
                } </Button>


            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}



export default Login
