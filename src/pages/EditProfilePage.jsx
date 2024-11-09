import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { NotebookPen, Mail, User, Save, X, Camera, Calendar } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Label } from "../components/ui/label"

function EditProfilePage() {
    const { theme } = useTheme()
    return (
        <main className="container mx-auto px-4 my-16">
            <Card className={`max-w-2xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <NotebookPen className={`h-6 w-6 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        Edit Profile
                    </CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    {/* <AvatarImage src={avatar} alt={`${firstName} ${lastName}`} />
                                    <AvatarFallback>{firstName[0]}{lastName[0]}</AvatarFallback> */}
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback><img src="https://avatar.iran.liara.run/public/boy?username=r" alt="user-img" /></AvatarFallback>
                                </Avatar>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full"
                                // onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                // ref={fileInputRef}
                                // onChange={handleFileChange}
                                />
                            </div>
                            <div className="space-y-1 text-center sm:text-left">
                                <h2 className="text-2xl font-semibold">Anuj Chaudhary</h2>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>NoteWorthy User</p>
                                <p className={`text-sm flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Calendar className="inline-block w-4 h-4 mr-1" />
                                    Member since November 2024
                                </p>
                            </div>
                        </div>
                        <hr className="dark:border-gray-700" />
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName" >First Name</Label>
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <Input
                                        id="firstName"
                                        // value={firstName}
                                        // onChange={(e) => setFirstName(e.target.value)}
                                        className={`pl-9 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-gray-500' : 'bg-white border-gray-300'}`}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <Input
                                        id="lastName"
                                        // value={lastName}
                                        // onChange={(e) => setLastName(e.target.value)}
                                        className={`pl-9 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 focus:border-gray-500' : 'bg-white border-gray-300'}`}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email (Non-editable)</Label>
                                <div className="relative">
                                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <Input
                                        id="email"
                                        // value={user.email}
                                        disabled
                                        className={`pl-9 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-500'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-4">
                        <Button className="w-full sm:w-auto  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                        <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => window.history.back()}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    )
}

export default EditProfilePage