import { createContext, useState } from "react";

// CONTEXT
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(
        localStorage.getItem('currentUserEmail') ?
            { email: localStorage.getItem('currentUserEmail') }
            : null
    );

    //HANDLE SIGN UP
    function signUp(email, password) {
        // Load existing users from localStorage, or start with an empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return { sucess: false, error: "Email already exists" };
        }

        const newUser = { email, password };

        // Add new user and persist
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUserEmail', email);

        setUser(newUser);

        return { success: true };
    }

    // HANDEL LOG IN
    function logIn(email, password) {
        // Load existing users from localStorage, or start with an empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email already exists
        const existingUser = users.find(user => user.email === email && user.password === password);
        if (!existingUser) {
            return { success: false, error: "Invalid email or password" }
        }

        // Set user data
        localStorage.setItem('currentUserEmail', email);
        setUser({ email });

        return { success: true };

    }

    // HANDLE LOG OUT
    function logOut() {
        localStorage.removeItem('currentUserEmail');
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}