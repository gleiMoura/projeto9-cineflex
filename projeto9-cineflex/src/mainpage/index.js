import "./style.css";
import React from "react"
import axios from "axios"


export default function FirstPage() {
    const [movie, setMovie] = React.useState([]);

    React.useEffect(() => {
        const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        request.then(answer => {
            setMovie(answer.data)
            console.log(answer.data)
        });

        request.catch(err => {
            console.error(err.data)
        })
    }, []);

    if (movie.length === null) {
        return "...carregando"
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
                                <div className="film">
                                    <img src={poster.posterURL} />
                                </div>
                            )
                        })}
                    </div>
                </main>
            </div>
        </>
    )
}