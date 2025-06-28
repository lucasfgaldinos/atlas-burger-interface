import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from "react"

export type UserProps = {
	id: string
	name: string
	token: string
	admin: boolean
	email: string
}

type UserContextProps = {
	userInfo: UserProps | null
	putUserData: (userData: UserProps) => void
	logout: () => void
}

const UserContext = createContext<UserContextProps | null>(null)

export function UserProvider({ children }: PropsWithChildren) {
	const [userInfo, setUserInfo] = useState<UserProps | null>(null)

	useEffect(() => {
		const userInfoLocalStorage = localStorage.getItem("atlas-burger:userData")

		if (userInfoLocalStorage) {
			setUserInfo(JSON.parse(userInfoLocalStorage))
		}
	}, [])

	function putUserData(userData: UserProps) {
		setUserInfo(userData)

		localStorage.setItem("atlas-burger:userData", JSON.stringify(userData))
	}

	function logout() {
		setUserInfo(null)
		localStorage.removeItem("atlas-burger:userData")
	}

	return (
		<UserContext.Provider value={{ userInfo, putUserData, logout }}>
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error("useUser must be a valid context.")
	}

	return context
}
