import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import './App.css'
import {Tasks} from "./feature/tasks/tasks.jsx";
import {
    Route, BrowserRouter, Routes
} from "react-router-dom";

import MainView from "./feature/mainView/mainView.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <MainView/>
                    }>
                    </Route>
                    <Route path="/tasks/" element={<Tasks/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
