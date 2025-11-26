
import { LogIn } from "lucide-react";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700">
			<div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full">
				<div className="flex flex-col items-center mb-6">
					<div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4">
						<LogIn className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ClarityScore</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">Login page</p>
				</div>
				<form className="space-y-5">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
						<input id="username" type="text" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400 transition" placeholder="Enter your username" required />
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
						<input id="password" type="password" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400 transition" placeholder="Enter your password" required />
					</div>
					<button type="submit" className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:scale-105 transition-all">Sign In</button>
				</form>
			</div>
		</div>
	);
}
