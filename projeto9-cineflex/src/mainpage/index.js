import "./style.css";
import "./reset.css";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default function FirstPage() {
    const [movie, setMovie] = React.useState([]);

    React.useEffect(() => {
        const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        request.then(answer => {
            setMovie(answer.data)
        });

        request.catch(err => {
            console.error(err.data)
        })
    }, []);

    if (movie.length === null || movie.length === 0) {
        return (
            <div className="FirstPage">
                <header>
                    CINEFLEX
                </header>
                <main>
                    <h1>...carregando</h1>
                    <div className="films">
                        <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/lg.progress-bar-preloader.gif" alt="carregamento" />
                    </div>
                </main>
            </div>
        )
    }
    return (
        <>
            <div className="FirstPage">
                <header>
                    CINEFLEX
                </header>
                <main>
                    <h1>Selecione o filme</h1>
                    <div className="films">
                        {movie.map(poster => {
                            return (
                                <Link to={`/sessoes/${poster.id}`}>
                                    <div className="film">
                                        <img src={poster.posterURL} alt="imagem do poster do filme" />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </main>
            </div>
        </>
    )
}