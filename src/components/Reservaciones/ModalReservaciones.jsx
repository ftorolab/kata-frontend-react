import React, { useState, useEffect, createRef, useRef} from "react";
import { Link } from "react-router-dom";
import { serverFetchPost } from '../../services/request';

import "./Reservaciones.css";

function ModalReservaciones({onClose, modalData}) {
    const [seats, setSeats] = useState([]);
    const [optionsMovies, setOptionsMovies] = useState({})
    const [isMovie, setIsMovie] = useState(false);
    let dataCompleted = {};
    const [formData, setFormData] = useState({
        movie_id: '3',
        schedule: '2024-02-24 00:00:00',
        selected_seats: 'G2',
        email: 'ftoro@bancodebogota.com.co'
      });
    const modalDetails = createRef();
    const formDataRef = useRef(formData);
    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);
    const transformedValues = () => {
      const movies = sessionStorage.getItem("movies")
        ? JSON.parse(sessionStorage.getItem("movies"))
        : [];
      return JSON.stringify(
        movies.map((movie) => ({
          text: movie.title,
          value: movie.id,
        }))
      );
    };

    const handleInputEvent = (e) => {
        const { name, value } = e.detail;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name !== 'duration' ? value : parseInt(value),
        }));
      };
      const componentIds = [
        '#inputEmail'
      ];

    const openModal = () => {
        if (
          modalDetails.current &&
          typeof modalDetails.current.openModal === 'function'
        ) {
          modalDetails.current.openModal();
        } else {
          console.error('Error in open modal');
        }
    };

    const cleanObject = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) => value !== '' && value !== null && value !== undefined,
            ),
        );
      };

    const handleClick = async () => {
        const dataBefore = modalData ? modalData.data : {};
        const dataUpdated = cleanObject(formDataRef.current)
        dataCompleted = (modalData
        ? {...dataBefore, ...dataUpdated }
        : {...formDataRef.current});
        console.log('dataCompleted', dataCompleted)
        try {
            const response = await serverFetchPost({ url: 'http://localhost:3002/api/reservations', data: dataCompleted });
            console.log('Reservation added:', response);
        } catch (error) {
            console.error("Error adding reservation:", error);
        }
        window.location.href = '/reservas';
    };
    
      useEffect(() => {
        openModal();
        setOptionsMovies(transformedValues())
        const componentModal = document.querySelector('bdb-ml-modal-normal');
        if (componentModal) {
          componentModal.addEventListener('clickedCancelModalBtn', (e) => {
            onClose();
          });
        }
        const buttonSaveBeneficiarie = document.getElementById(
          'buttonSaveBeneficiarie'
        );
        const buttonExit = document.getElementById(
          'buttonExit'
        );
        if (buttonSaveBeneficiarie) {
          buttonSaveBeneficiarie.addEventListener('click', (e) => {
            handleClick();
            onClose(false);
          });
        }
        if (buttonExit) {
          buttonExit.addEventListener('click', (e) => {
            onClose(false);
          });
        }
      }, []);

      useEffect(() => {
        componentIds.forEach((id) => {
          const component = document.querySelector(id);
          if (component) {
            const listener = (e) => handleInputEvent(e);
            component.addEventListener('atInputChanged', listener);
          }
        });
        const dropdownTypeDocument = document.getElementById('dropMovie');
        if (dropdownTypeDocument) {
          dropdownTypeDocument.addEventListener('elementSelectedAtom', (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [e.detail.name]: parseInt(e.detail.value),
            }));
            setIsMovie(true)
          });
        }
      }, [])
    
    return (
        <>
            <div className='containerModal' id='containerModal'>
            <bdb-ml-modal-normal ref={modalDetails} size-modal="lg" titlemodal="Reservar">
            <div slot='body-modal'>
              <div className='inputTxt'>
                <bdb-at-input
                    id='inputEmail'
                    name='email'
                    label='Email'
                    type='EMAIL'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.raiting : ''}
                ></bdb-at-input>
                </div>
                <div className='inputTxt'>
                <bdb-at-dropdown
                    id='dropMovie'
                    name='movie_id'
                    label='Pelicula'
                    status='ENABLED'
                    placeholder='Seleccione'
                    options={optionsMovies}
                    defaultvalue={modalData ? modalData.data.id_room : ''}
                ></bdb-at-dropdown>
                </div>
                {isMovie && (
                  <bdb-ml-multi-selector is-check label="Selecciones los asientos a reservar" values-to-card='[{"title" : "G1","desc": "sala 1","value": "0", "isChecked": "false", "tagName": "Disponible", "disabled": false},{"title" : "G2","desc": "sala 1","value": "1", "isChecked": "false", "tagName": "Disponible", "disabled": false},{"title" : "G3","desc": "sala 1","value": "1", "isChecked": "false", "tagName": "Disponible", "disabled": false}]'></bdb-ml-multi-selector>
                )
                }
                <div className='containerButtons'>
                <div className='containerButton1'>
                    <button
                    id='buttonSaveBeneficiarie'
                    className='bdb-at-btn bdb-at-btn--primary bdb-at-btn--lg'
                    >
                    Guardar y salir
                    </button>
                </div>
                <div className='containerButton2'>
                    <button
                    className='bdb-at-btn  bdb-at-btn--secondary bdb-at-btn--lg'
                    id='buttonExit'
                    >
                    Salir sin guardar
                    </button>
                </div>
                </div>
            </div>
            </bdb-ml-modal-normal>
            </div>
        </>
    );
}

export default ModalReservaciones;