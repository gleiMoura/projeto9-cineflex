import "./style.css";
import "./reset.css"
import React from "react";
import { Link } from "react-router-dom"

export default function Success({filmName, date, hour, seats,shopper,cpf}) {
    return (
        <div className="Success">
            <header>
                CINEFLEX
            </header>
            <main>
                <h1>Pedido feito<br></br> com sucesso</h1>
                <div className="informations">
                    <div className="information">
                        <h1>Filme e sessão</h1>
                        <p>{filmName}</p>
                        <p>{date} {hour}</p>
                    </div>
                    <div className="information">
                        <h1>Ingressos</h1>
                        {seats.map(element => {
                            return(
                                <p>Assento {element}</p>
                            )
                        })}
                    </div>
                    <div className="information">
                        <h1>Comprador</h1>
                        <p>Nome: {shopper}</p>
                        <p>CPF: {cpf}</p>
                    </div>
                </div>

                <Link to={"/"}>
                    <button>Voltar para Home</button>
                </Link>
            </main>

        </div>
    )
}
