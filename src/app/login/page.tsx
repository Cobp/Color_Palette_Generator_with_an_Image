"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ColoredBars from "@/components/ColoredBarsScreen";
import {
    IconEmail,
    IconPassword,
    IconGithub,
    IconGoogle,
} from "@/Icons/mainIcons";

function LoginPage() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) return setError(res.error as string);

        if (res?.ok) return router.push("/");
    };
    return (
        <section className="relative flex items-center justify-center w-full h-screen overflow-hidden">
            <ColoredBars />
            <div className="max-w-lg w-full flex flex-col z-10 bg-[#1b2020]/60 shadow-2xl shadow-black m-2 p-8 sm:p-14 gap-8 rounded-xl border border-white/20 backdrop-blur-xl">
                <h1 className="font-semibold text-2xl text-center selection:bg-emerald-800">
                    Login to your account
                </h1>
                <div className="flex flex-wrap sm:grid grid-cols-2 gap-6 select-none">
                    <button
                        type="button"
                        className="flex items-center justify-center font-semibold text-base w-full h-11 rounded-full border border-gray-300/75 bg-white hover:bg-neutral-200 px-6 transition focus:bg-neutral-200 active:bg-neutral-300 text-zinc-700 gap-2"
                    >
                        <i className="size-8 p-1">
                            <IconGoogle />
                        </i>
                        With Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center font-semibold text-base w-full h-11 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 gap-2"
                    >
                        <i className="size-8 p-1">
                            <IconGithub />
                        </i>
                        With GitHub
                    </button>
                </div>
                <div className="flex items-center gap-2 selection:bg-emerald-800">
                    <div className="w-full h-0.5 bg-white/20 rounded-full" />
                    Or
                    <div className="w-full h-0.5 bg-white/20 rounded-full" />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <label
                        htmlFor="react-input-icgi-email"
                        className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300"
                    >
                        <i className="absolute left-1 size-6">
                            <IconEmail />
                        </i>
                        <input
                            id="react-input-icgi-email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            className="w-full bg-transparent pl-10 pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition invalid:text-red-600 selection:bg-emerald-800"
                        />
                    </label>
                    <label
                        htmlFor="react-input-icgi-password"
                        className="relative group before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-emerald-600 focus-within:before:!scale-x-100 before:transition before:duration-300"
                    >
                        <i className="absolute left-1 size-6">
                            <IconPassword />
                        </i>
                        <input
                            id="react-input-icgi-password"
                            name="password"
                            type="password"
                            placeholder="Your password"
                            className="w-full bg-transparent pl-10 pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition selection:bg-emerald-800"
                        />
                    </label>
                    <button
                        className="w-full bg-emerald-600 px-6 py-3 rounded-full"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-400 select-none">
                    Don't have an account ?
                    <a
                        href="/register"
                        className="pl-2 text-emerald-400 hover:text-emerald-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </section>
    );
}

export default LoginPage;
