import "./style.css";
import "./reset.css";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Seats() {
    const [session, setSession] = React.useState([]);

    const { idSessao } = useParams();

    React.useEffect(() => {
        const requestion = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        requestion.then(answer => {
            setSession(answer.data)
        })

        requestion.catch(err => {
            console.error(err.data)
        })
    }, [idSessao])

    const movieInformation = session.movie;
    const placeToSeat = session.seats;
    console.log(placeToSeat)

    function LitleBall({ name, boolean }) {
        if(boolean === true) {
            return (
                <div className="ball colorAvailable">
                    <p>{name}</p>
                </div>
            )
        }else if(boolean === false){
            return (
                <div className="ball colorUnavailable">
                    <p>{name}</p>
                </div>
            )
        }
    }

    if (session.length === 0 || session.length === null) {
        return (
            <div className="Session">
                <header>
                    CINEFLEX
                </header>
                <main>
                    <h1>Selecione o horário</h1>
                </main>
                <img className="loading" src="https://www.blogson.com.br/wp-content/uploads/2017/10/lg.progress-bar-preloader.gif" />
            </div>
        )
    }

    return (
        <div className="Seats">
            <header>
                CINEFLEX
            </header>
            <main>
                <h1>Selecione o(s) assento(s)</h1>
                <div className="all-seats">
                    {placeToSeat.map(element => {
                        return(
                            <LitleBall name={element.name} boolean={element.isAvailable} />
                        )
                    })}
                </div>
                <div className="all-seats"></div>
                <div className="all-seats"></div>
            </main>
            <footer>
                <div className="film">
                    <img src={movieInformation.posterURL} alt="imagem do poster do filme" />
                </div>
                <h1>{movieInformation.title}<br/><br/>{session.day.weekday}</h1>
            </footer>
        </div>
    )
}