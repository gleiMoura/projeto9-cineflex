import FirstPage from "./mainpage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Session from "./session.js";
import Seats from "./seats.js";

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element={<FirstPage />}></Route>
                    <Route path = "/sessoes/:idSessoes" element={<Session />}></Route>
                    <Route path = "/assentos/:idSessao" element={<Seats />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}