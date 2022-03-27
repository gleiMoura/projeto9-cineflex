import "./style.css";
import "./reset.css";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Seats() {
    const [session, setSession] = React.useState([]);
    const { idSessao } = useParams();
    const movieInformation = session.movie;// taken from requestion
    const placeToSeat = session.seats; //taken from requestion
    let listOfSeats = [];//used to keep the seat names
    const [personcpf, setPersoncpf] = React.useState("");
    const [personName, setPersonName] = React.useState("");

    React.useEffect(() => {
        const requestion = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        requestion.then(answer => {
            setSession(answer.data)
        })

        requestion.catch(err => {
            console.error(err.data)
        })
    }, [idSessao])

    function LitleBall({ name, boolean }) {
        const [isSelected, setIsSelected] = React.useState(false);
        if (boolean === true) {
            function isTrueOrFalse() {
                if (isSelected === false) {
                    listOfSeats.push(name)
                } else {
                    listOfSeats = listOfSeats.filter(element => element !== name ? element : '')
                }
            }
            return (
                <div className={isSelected ? "ball colorSelected" : "ball colorAvailable"} onClick={() => { isTrueOrFalse(); setIsSelected(!isSelected) }}>
                    <p>{name}</p>
                </div>
            )
        } else if (boolean === false) {
            return (
                <div className="ball colorUnavailable" onClick={() => {
                    alert("Você não pode escolher este a!")
                }}>
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
                        return (
                            <LitleBall name={element.name} boolean={element.isAvailable} />
                        )
                    })}
                </div>
                <div className="subtitle">
                    <div className="content-subtitle">
                        <div className="ball colorSelected"></div>
                        <p>Selecionado</p>
                    </div>
                    <div className="content-subtitle">
                        <div className="ball colorAvailable"></div>
                        <p>Disponível</p>
                    </div>
                    <div className="content-subtitle">
                        <div className="ball colorUnavailable"></div>
                        <p>indisponível</p>
                    </div>
                </div>

                <div className="form">
                    <label htmlFor="nome" className="label-nome">Nome do comprador</label>
                    <input type="text" id="nome" className="nome" placeholder="digite seu nome" onChange={(e) => {
                        setPersonName(e.target.value);
                    }} />

                    <label htmlFor="cpf" className="label-cpf">cpf do comprador</label>
                    <input type="text" id="cpf" className="cpf" placeholder="digite seu cpf" onChange={(e) => {
                        setPersoncpf(e.target.value);
                    }} />

                    <button onClick={() => {
                        if(listOfSeats.length ===0){
                            alert("escolha uma assento!")
                        }
                        if(personName === ""){
                            alert("digite seu nome!")
                        }
                        if(personcpf === ""){
                            alert("digite seu cpf")
                        }
                    }}>Reservar Assentos</button>
                </div>
            </main>
            <footer>
                <div className="film">
                    <img src={movieInformation.posterURL} alt="imagem do poster do filme" />
                </div>
                <h1>{movieInformation.title}<br /><br />{session.day.weekday}</h1>
            </footer>
        </div>
    )
}