import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Plus, Lightbulb, } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Link } from "react-router-dom"

function EmptyState() {
    const { theme } = useTheme()
    return (
        <main className="flex justify-center px-4 sm:px-6 lg:px-8 my-20">
            <Card className={`w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardContent className="p-6 md:p-8 text-center">
                    <Lightbulb className={`h-16 w-16 mx-auto mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <h1 className="text-3xl font-bold mb-4">Welcome to NoteWorthy!</h1>
                    <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your journey to organized thoughts begins here. Start by creating your first note.
                    </p>
                    <Link to='/add-note'>
                        <Button size="lg" className="bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-700 text-white transition-all">
                            <Plus className="h-5 w-5 mr-2" />
                            Create Your First Note
                        </Button>
                    </Link>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <h2 className="font-semibold mb-2">Capture Ideas</h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                Quickly jot down your thoughts and inspirations.
                            </p>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <h2 className="font-semibold mb-2">Stay Organized</h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                Keep your notes structured and easily accessible.
                            </p>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <h2 className="font-semibold mb-2">Sync Everywhere</h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                Access your notes from any device, anytime.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default EmptyState