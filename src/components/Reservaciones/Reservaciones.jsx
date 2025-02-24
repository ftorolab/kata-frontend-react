import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverFetchGet } from '../../services/request';
import ModalReservaciones from './ModalReservaciones';

import "./Reservaciones.css";

function Reservaciones() {
    const [values, setValues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const openAndCloseModal = (flag, data) => {
        setShowModal(flag);
    };
    

    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await serverFetchGet({ url: 'http://localhost:3002/api/reservations' });
                const transformedValues = JSON.stringify(data.map(reservation => ({
                    id: reservation.id,
                    Fecha: reservation.schedule,
                    Pelicula: reservation.movie_title,
                    Sala: reservation.room_name,
                    Asientos: reservation.selected_seats,
                    Email: { "type": "success", "text": reservation.email }
                })));
                setValues(transformedValues);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
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
                Reservaciones
            </div>
            <div className="containerOptions1">
            <bdb-ml-horizontal-selector  
                selection-values = '[{"id":0,"text":"Reservar","value":"0","disabled":false}]'
            >
            </bdb-ml-horizontal-selector>
            </div>
            
            <div className="insContainer2">
            
            <bdb-ml-dynamic-table 
                column-table='[{"colName":"", "control":"id"},{"colName":"Fecha", "control":"date"},{"colName":"Pelicula", "control":"text"},{"colName":"Sala", "control":"text"},{"colName":"Asientos", "control":"text"},{"colName": "Email", "control":"tag"}]' 
                row-table={values}>
            </bdb-ml-dynamic-table>
            </div>
            {showModal && (
            <ModalReservaciones
                onClose={openAndCloseModal}
            />
            )}
            <bdb-ml-footer-landing options='[]' options-business='[]' show-stores={false} show-fogafin={false}></bdb-ml-footer-landing>
        </>
    );
}

export default Reservaciones;