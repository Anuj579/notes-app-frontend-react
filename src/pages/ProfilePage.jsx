import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { NotebookPen, Mail, User, Trash2, UserRoundPen, Calendar } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Link } from "react-router-dom"

function ProfilePage() {
    const { theme } = useTheme()
    return (
        <main className="container mx-auto px-4 my-16">
            <Card className={`max-w-2xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <NotebookPen className={`h-6 w-6 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar className="h-24 w-24">
                            {/* <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                                <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback> */}
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback><img src="https://avatar.iran.liara.run/public/boy?username=r" alt="user-img" /></AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 text-center sm:text-left">
                            <h2 className="text-2xl font-semibold">Anuj Chaudhary</h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>NoteWorthy User</p>
                            <p className={`text-sm flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                <Calendar className="inline-block w-4 h-4 mr-1" />
                                Member since November 2024
                            </p>
                        </div>
                    </div>
                    <hr className="dark:border-gray-700"/>
                    <div className="grid gap-4">
                        <div className="flex items-center space-x-2">
                            <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className="font-medium">First Name:</span>
                            <span>Anuj</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className="font-medium">Last Name:</span>
                            <span>Chaudhary</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className="font-medium">Email:</span>
                            <span>anuj@gmail.com</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="w-full sm:w-auto">
                        <Link to="/edit-profile">
                            <UserRoundPen className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Link>
                    </Button>
                    <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:text-white">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}

export default ProfilePage