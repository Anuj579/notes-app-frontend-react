import { Loader2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"

function AuthModal({ isOpen, title, description, actionText }) {
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
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {actionText}
                </p>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AuthModal