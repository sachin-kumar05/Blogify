import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { Logo, Button, Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth.service'
import { useForm } from 'react-hook-form'
function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("")

  const login = async(data) => {
    try {
      const session = await authService.login(data)
      if(session) {
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(storeLogin(userData))
        navigate("/")   // Diff: link-> you have click and navigate-> programmatic navigation, no need to click.
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-25'>
            <Logo width='100%'/>
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Don&apos;t have any account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'  
          >Sign Up</Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        {/* Here in the form HandleSubmit is the event/method provided by the react-hook-form in which we pass our method to handle the submit that is login(In normal form we might have given the name handleSubmit instead of login for our handle the submit) and since its provide the register also so we don't have to manage state for the inputs ourselves*/}
        <form onClick={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>

            <Input 
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(value) || "Email address must be valid",
                }
              })}
            />

            <Input 
              label="password"
              type="passwor"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button 
              type='submit'
              className='w-full'
            >Sign in</Button>

          </div>  
        </form>   
      </div>
    </div>
  )
}

export default Login