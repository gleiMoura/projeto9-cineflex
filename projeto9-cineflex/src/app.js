import FirstPage from "./mainpage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Session from "./session/index.js";
import Seats from "./seats/index.js";
import Success from "./success/index.js";
import React from 'react'

export default function App(){
    const [data, setData] = React.useState({})

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element={<FirstPage />}></Route>
                    <Route path = "/sessoes/:idSessoes" element={<Session />}></Route>
                    <Route path = "/assentos/:idSessao" element={<Seats data={data} setData={setData} />}></Route>
                    <Route path="/sucesso" element={<Success filmName={data.filmName} date={data.date} hour={data.hour} seats = {data.seats} shopper={data.shopper} cpf={data.cpf}/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
