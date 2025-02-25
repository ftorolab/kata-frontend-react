import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverFetchGet } from '../../services/request';
import ModalPeliculas from './ModalPeliculas';

import "./Peliculas.css";

function Peliculas() {
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const openAndCloseModal = (flag, data) => {
        setShowModal(flag);
    };
    

    useEffect(() => {

        async function fetchMovies() {
            try {
                const data = await serverFetchGet({ url: 'http://localhost:3002/api/movies' });
                setMovies(data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        const rooms = sessionStorage.getItem('rooms') ? JSON.parse(sessionStorage.getItem('rooms')) : null;
        async function fetchRooms() {
            try {
                if (rooms === null) {
                    const data = await serverFetchGet({ url: 'http://localhost:3002/api/rooms' });
                    setRooms(data);
                    sessionStorage.setItem('rooms', JSON.stringify(data));
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
        fetchRooms();
    }, []);

    useEffect(() => {
      const selector = document.querySelector("bdb-ml-horizontal-selector");
      if (selector) {
        selector.addEventListener("mlHorizontalSelectorClicked", (e) => {
          if (e.detail.value === "0") {
            openAndCloseModal(true, {});
          }
        });
      }
    }, []);

    
    return (
        <>
            <bdb-ml-header buttons-actions="3" back='FALSE' close='FALSE'></bdb-ml-header>
            <div className="containerTitle">
                    Peliculas
            </div>
            <div className="containerOptions1">
            <bdb-ml-horizontal-selector  selection-values = '[{"id":0,"text":"Agregar","value":"0","disabled":false}]'></bdb-ml-horizontal-selector>
            </div>
            
            <div className="insContainer">
                {movies.map((movie, index) => (
                        <div key={index} className="containerCard">
                            <bdb-ml-card-promotion title-card={movie.title} description={`Género:${movie.genre} | Raiting:${movie.rating} | Duración:${movie.duration} min.`} tag="TAG" btn labelbtn="Editar" large={true} value=""></bdb-ml-card-promotion>
                        </div>
                ))}
            </div>
            {showModal && (
            <ModalPeliculas
                onClose={openAndCloseModal}
            />
            )}
            <bdb-ml-footer-landing options='[]' options-business='[]' show-stores={false} show-fogafin={false}></bdb-ml-footer-landing>
        </>
    );
}

export default Peliculas;