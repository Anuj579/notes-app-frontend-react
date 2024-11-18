import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { ClipLoader } from "react-spinners"
import { useTheme } from "../contexts/ThemeContext"

function AuthModal({ isOpen, title, description, actionText }) {
    const { theme } = useTheme()
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='justify-center'>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center items-center p-4">
                    <ClipLoader size={50} loading={isOpen} color={theme === "light" ? "#2563EB" : "#60A5FA"} />
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {actionText}
                </p>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AuthModal