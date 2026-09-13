import { motion } from "framer-motion";
import FormRegister from "../components/auth/FormRegister";
const Register = () => {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center h-screen bg-[#fafafa]/50 " >
            <div className="w-xs p-6 bg-white rounded-lg shadow-lg">
                {/* Title */}
                <h1 className=" mt-2 text-lg font-bold text-blue-400 text-center">Sign up for your account</h1>
                {/* Form register */}
                <div>
                    <FormRegister />
                </div>
            </div>
        </motion.div>
    )
}

export default Register
