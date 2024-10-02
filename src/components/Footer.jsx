import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Footer() {
    return (
        <div id="Footer">
            <div id="sideLeft">
                <h1 id="titleFooter">Entre em Contato</h1>
                <p>Ruan Valença - Desenvolvedor Front-End. Entre em contato nas redes abaixo:</p>
                <div id="itensFooter">
                    <a target="_blank" href="https://github.com/RuanValenca">
                        <i id="img1" className="fab fa-github"></i>
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/ruanvalenca/">
                        <i id="img2" className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
            <p id="credito">Dados fornecidos por <a target="_blank" href="https://www.themoviedb.org/">The Movie Database (TMDb)</a>.</p>
            <br />
        </div>
    );
}
