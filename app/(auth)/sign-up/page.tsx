'use client';
import InputField from "@/components/forms/InputField";
import { Input } from "@/components/ui/input";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { useForm } from "react-hook-form"
import { SelectFields } from "@/components/forms/SelectFields";


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
       {/*Country*/}

       <SelectFields
       name="investmentGoals"
       label="Investment Goals"
       placeholder="Select your investment goals"
       options={INVESTMENT_GOALS}
       control={control}
       error={errors.investmentGoals}
       required
       />
        <SelectFields
       name="riskTolerance"
       label="Risk Tolerance"
       placeholder="Select your risk level"
       options={RISK_TOLERANCE_OPTIONS}
       control={control}
       error={errors.riskTolerance}
       required
       />
        <SelectFields
       name="preferredIndustry"
       label="Preferred Industry"
       placeholder="Select your preferred industry"
       options={PREFERRED_INDUSTRIES}
       control={control}
       error={errors.preferredIndustry}
       required
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
