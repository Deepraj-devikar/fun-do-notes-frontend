import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main_page/MainPage";
import SignIn from '../pages/sign_in/SignIn';
import SignUp from "../pages/sign_up/SignUp";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}