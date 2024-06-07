"use client";
import ColoredBars from "@/components/ColoredBarsScreen";
import { IconEmail, IconPassword, IconUserCircle, IconGoat } from "@/Icons/mainIcons";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";


const RegisterPage = () => {
  const [error, setError] = useState()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const formData = new FormData(e.currentTarget);

    try {
      const signinResponse = await axios.post('/api/auth/singup', {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        password: password,
      });

      const res = await signIn('credentials', {
        email: signinResponse.data.email,
        password: formData.get('password'),
        redirect: false,
      });

      if (res?.ok) return router.push("/")

    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  };

  return (
    <section className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      <ColoredBars />
      <div className="relative max-w-2xl w-full flex flex-col z-10 bg-[#1b2020]/60 shadow-2xl shadow-black m-2 p-8 sm:p-14 gap-8 rounded-xl border border-white/20 backdrop-blur-xl">
        <i className="absolute size-20 p-3 -top-10 left-2/4 border border-white/20 -translate-x-2/4 rounded-full bg-[#1b2020]">
          <IconGoat />
        </i>
        <h1 className="font-semibold text-3xl text-center selection:bg-emerald-800 mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
            <label htmlFor="react-input-icgi-firstname" className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300">
              <i className="absolute left-1 size-6">
                <IconUserCircle />
              </i>
              <input id="react-input-icgi-firstname" name="firstname" type="text" placeholder="First Name" className="w-full bg-transparent pl-10 pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition invalid:text-red-600 selection:bg-emerald-800" />
            </label>
            <label htmlFor="react-input-icgi-lastname" className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300">
              <i className="absolute left-1 size-6">
                <IconUserCircle />
              </i>
              <input id="react-input-icgi-lastname" name="lastname" type="text" placeholder="Last Name" className="w-full bg-transparent pl-10 pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition invalid:text-red-600 selection:bg-emerald-800" />
            </label>
          </div>
          <label htmlFor="react-input-icgi-email" className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300">
            <i className="absolute left-1 size-6">
              <IconEmail />
            </i>
            <input id="react-input-icgi-email" name="email" type="email" placeholder="Email" className="w-full bg-transparent pl-10 pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition invalid:text-red-600 selection:bg-emerald-800" />
          </label>
          {error && <p className="text-red-600">{error}</p>}
          <label htmlFor="react-input-icgi-password" className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300">
            <i className="absolute left-1 size-6">
              <IconPassword />
            </i>
            <input
              id="react-input-icgi-password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full bg-transparent pl-10 pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition selection:bg-emerald-800"
            />
          </label>
          <label htmlFor="react-input-icgi-confirm-password" className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300">
            <i className="absolute left-1 size-6">
              <IconPassword />
            </i>
            <input
              id="react-input-icgi-confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full bg-transparent pl-10 pb-3 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none invalid:border-red-400 transition selection:bg-emerald-800"
            />
          </label>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-500 px-6 py-3 rounded-full transition-all">Send</button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;

