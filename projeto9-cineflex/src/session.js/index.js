import "./style.css";
import "./reset.css"
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import {Link} from "react-router-dom"

export default function Session() {

    const [allSessions, setAllSessions] = React.useState([])

    const { idSessoes } = useParams();

    React.useEffect(() => {

        const requestion = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idSessoes}/showtimes`)
        requestion.then(answer => {
            setAllSessions(answer.data);
        })

        requestion.catch(err => {
            console.error(err.data)
        })
    }, [idSessoes])

    if (allSessions.length === 0 || allSessions.length === null) {
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

    const listOfDays = allSessions.days;
    console.log(listOfDays)

    return (
        <div className="Session">
            <header>
                CINEFLEX
            </header>
            <main>
                <h1>Selecione o horário</h1>
                {listOfDays.map(element => {
                    return (
                        <section>
                            <div className="day">{element.weekday} - {element.date}</div>
                            <div className="hour">
                                {element.showtimes.map(time => {
                                    return(
                                        <Link to={`/assentos/${time.id}`}>
                                            <h1>{time.name}</h1>
                                        </Link>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}
            </main>
            <footer>
                <div className="film">
                    <img src={allSessions.posterURL} alt="imagem do poster do filme" />
                </div>
                <h1>{allSessions.title}</h1>
            </footer>
        </div>
    )
}

