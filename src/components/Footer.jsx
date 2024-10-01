import React from "react"

export default function Footer() {
    return (
        <div id="Footer">
            <div id="sideLeft">
                <h1 id="titleFooter">Entre em Contato</h1>
                <p>Ruan Valença - Desenvolvedor Front-End. Entre em contato nas redes abaixo:</p>
                <div id="itensFooter">
                    <a target="_blank" href="https://github.com/RuanValenca"> <img id="img1" src="C:\Users\User\Visual Code\AbsoluteCinema\src\components\img\github-icon-2048x2048-qlv5m092.png" alt="Github" /> </a>
                    <a target="_blank" href="https://www.linkedin.com/in/ruanvalenca/"><img id="img2" src="C:\Users\User\Visual Code\AbsoluteCinema\src\components\img\linkedin vazio.webp" alt="Linkedin" /> </a>
                </div>
            </div>
            <p id="credito">Dados fornecidos por <a target="blank" href="https://www.themoviedb.org/">The Movie Database (TMDb)</a>.</p>
            <br />
        </div>


    )
}