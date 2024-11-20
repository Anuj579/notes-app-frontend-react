import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { ClipLoader } from "react-spinners"
import { useTheme } from "../contexts/ThemeContext"

function ActionLoader({ isOpen, text }) {
    const { theme } = useTheme()
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className='max-w-80'>
                <AlertDialogHeader className="flex gap-4 items-center ">
                    <AlertDialogTitle className='sr-only'>Loading</AlertDialogTitle>
                    <ClipLoader color={theme === "light" ? "#2563EB" : "#60A5FA"} size={28} />
                    <AlertDialogDescription className='font-medium'>{text}</AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ActionLoader