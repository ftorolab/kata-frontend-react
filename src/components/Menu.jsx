import React, { useEffect, useState } from "react";
import "./Menu.css";

function Menu() {

    useEffect(() => {
        const selector = document.querySelector('bdb-ml-multi-action');
        if (selector) {
            selector.addEventListener('cardClicked', (e) => {
            console.log('first', e.detail);
            if (e.detail.value === '0') {
                window.location.href = '/peliculas';
            }
            if (e.detail.value === '1') {
                window.location.href = '/salas';
            }
            if (e.detail.value === '2') {
                window.location.href = '/reservas';
            }
          });
        }
      }, []);

    
    return (
        <>
            <bdb-ml-header buttons-actions="3" back='FALSE' close='FALSE'></bdb-ml-header>
            <div className="containerTitle">
                Gestor de reservas
            </div>
            <div className="containerOptions">
            <bdb-ml-multi-action values-to-card='[{"desc": "Peliculas","value": "0"},{"desc": "Salas","value": "1"},{"desc": "Reservas","value": "2"}]'></bdb-ml-multi-action>
            </div>
            <bdb-ml-footer-landing options='[]' options-business='[]' show-stores={false} show-fogafin={false}></bdb-ml-footer-landing>
        </>
    );
}

export default Menu;