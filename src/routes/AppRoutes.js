import { BrowserRouter, Router, Routes, Route } from "react-router-dom"
import TodoApp from "../pages/TodoApp";

function AppRoutes(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TodoApp />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoutes;