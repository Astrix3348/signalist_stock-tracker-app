'use client';
import InputField from "@/components/forms/InputField";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"

const SignUp = () => {
const {
  register,
  handleSubmit,
  control,
  formState: { errors, isSubmitting },
} = useForm<SignUpFormData>({
    defaultValues: {
    fullName: '',
    email: '',
    password: '',
    country: 'US',
    investmentGoals: 'Growth',
    riskTolerance: 'Medium',
    preferredIndustry: 'Technology'
    },
    mode: 'onBlur'
},);
const onSubmit = async (data: SignUpFormData) => {
  try {
     console.log(data);
  } catch (e) {
    console.error(e);
  }
}

  return (
    <>
    <h1 className="form-title">Sign Up & Personalize</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        name="fullName"
        label="Full Name"
        placeholder="John Doe"
        register={register}
        error={errors.fullName}
        validation={{ required: 'Full Name is required', minLength: 2 }}
      />
      
      <InputField
        name="email"
        label="Email"
        placeholder="contact@example.com"
        register={register}
        error={errors.email}
        validation={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
      />
      
      <InputField
        name="password"
        label="Password"
        placeholder="Enter a strong password"
        type="password"
        register={register}
        error={errors.password}
        validation={{ required: 'Password is required', minLength: 8 }}
      />

      <button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
        {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
      </button>
      
    </form>
    </>
  )
}

export default SignUp;