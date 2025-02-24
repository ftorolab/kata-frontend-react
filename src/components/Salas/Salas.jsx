import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverFetchGet } from '../../services/request';
import ModalSalas from './ModalSalas';

import "./Salas.css";

function Salas() {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const openAndCloseModal = (flag, data) => {
        setShowModal(flag);
    };
    

    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await serverFetchGet({ url: 'http://localhost:3002/api/rooms' });
                console.log('rooee', data)
                setRooms(data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        }
        fetchMovies();
    }, []);

    useEffect(() => {
      const selector = document.querySelector("bdb-ml-horizontal-selector");
      if (selector) {
        selector.addEventListener("mlHorizontalSelectorClicked", (e) => {
          console.log("first", e.detail);
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
                    Salas
            </div>
            <div className="containerOptions1">
            <bdb-ml-horizontal-selector  selection-values = '[{"id":0,"text":"Agregar","value":"0","disabled":false}]'></bdb-ml-horizontal-selector>
            </div>
            
            <div className="insContainer">
                {rooms.map((room, index) => (
                        <div key={index} className="containerCard">
                            <bdb-ml-card-promotion title-card={room.name} description={`Capacidad: ${room.capacity}`} tag="TAG" btn labelbtn="Editar" large={true} value=""></bdb-ml-card-promotion>
                        </div>
                ))}
            </div>
            {showModal && (
            <ModalSalas
                onClose={openAndCloseModal}
            />
            )}
            <bdb-ml-footer-landing options='[]' options-business='[]' show-stores={false} show-fogafin={false}></bdb-ml-footer-landing>
        </>
    );
}

export default Salas;