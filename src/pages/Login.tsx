import { motion } from "framer-motion";
import FormLogin from "../components/auth/FormLogin";

const Login = () => {
    return (
        <motion.main
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex min-h-screen items-center justify-center bg-[#fafafa]"
        >
            <div className="w-[320px] rounded-lg bg-white p-6 shadow-lg">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-lg font-bold text-gray-900">
                        Login
                    </h1>

                    <p className="mt-1 text-xs text-gray-500">
                        How do i get started lorem ipsum dolor at?
                    </p>
                </div>

                {/* Form */}
                <FormLogin />
            </div>
        </motion.main>
    );
};

export default Login;