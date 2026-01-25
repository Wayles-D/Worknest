import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // temp logged in user
    useEffect(() => {
        const tempUser = {
            name: "Saidi Money",
            avatar: "/tempAvatar.png",
            role: "User"
        };
        setUser(tempUser);
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);