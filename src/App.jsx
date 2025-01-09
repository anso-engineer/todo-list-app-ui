import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Tasks} from "./feature/tasks/tasks.jsx";
import {
    Route, BrowserRouter, Routes
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/tasks/" element={<Tasks />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
