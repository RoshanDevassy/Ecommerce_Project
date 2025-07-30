
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { submitProduct } from '../features/product/productSlice';

const schema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .max(100),

  password: z
    .string()
    .min(8, "Min 8 characters")
    .max(64)
    .regex(/[A-Z]/, "One uppercase letter")
    .regex(/[a-z]/, "One lowercase letter")
    .regex(/[0-9]/, "One number")
    .regex(/[^a-zA-Z0-9]/, "One special character")
    .regex(/^[^<>]*$/, "No HTML tags"),

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords don't match"
});

export default function SecureRegisterForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // Sanitize email and password before sending
    const sanitizedData = {
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
    };

    // You’d send to backend — here just dispatching mock Redux thunk
    await dispatch(submitProduct({ title: sanitizedData.email, price: 0 }));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <h2>Secure Registration</h2>

      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

