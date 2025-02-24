import React, { useState, useEffect, createRef, useRef} from "react";
import { Link } from "react-router-dom";
import { serverFetchPost } from '../../services/request';

import "./Reservaciones.css";

function ModalReservaciones({onClose, modalData}) {
    let dataCompleted = {};
    const [formData, setFormData] = useState({
        movie_id: '',
        schedule: '',
        selected_seats: '',
        email: ''
      });
    const modalDetails = createRef();
    const formDataRef = useRef(formData);
    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    const handleInputEvent = (e) => {
        const { name, value } = e.detail;
        console.log('first', value)
        setFormData((prevData) => ({
          ...prevData,
          [name]: name !== 'duration' ? value : parseInt(value),
        }));
      };
      const componentIds = [
        '#inputTitle',
        '#inputGenre',
        '#inputDuration',
        '#inputRating',
        '#dropRoom',
      ];

    const optionsDropdown =`[
        {"text":"Sala 1","value":"1"}
      ]`;
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
            const response = await serverFetchPost({ url: 'http://localhost:3002/api/movies', data: dataCompleted });
            console.log('Movie added:', response);
        } catch (error) {
            console.error("Error adding movie:", error);
        }
        window.location.href = '/peliculas';
    };
    
      useEffect(() => {
        openModal();
        const componentModal = document.querySelector('bdb-ml-drawer');
        if (componentModal) {
          componentModal.addEventListener('eCloseDrawer', (e) => {
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
        const dropdownTypeDocument = document.getElementById('dropRoom');
        if (dropdownTypeDocument) {
          dropdownTypeDocument.addEventListener('elementSelectedAtom', (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [e.detail.name]: parseInt(e.detail.value),
            }));
          });
        }
      }, [])
    
    return (
        <>
            <div className='containerModal' id='containerModal'>
            <bdb-ml-modal-normal ref={modalDetails} size-modal="lg" titlemodal="Reservar">
            <div slot='body-modal'>
                <div className='inputTxt'>
                <bdb-at-dropdown
                    id='dropRoom'
                    name='movie_id'
                    label='Pelicula'
                    status='ENABLED'
                    placeholder='Seleccione'
                    options={optionsDropdown}
                    defaultvalue={modalData ? modalData.data.id_room : ''}
                ></bdb-at-dropdown>
                </div>
                <div className='inputTxt'>
                <bdb-at-input
                    id='inputDate'
                    name='schedule'
                    label='Horario'
                    type='DATE'
                    required='true'
                    view-mode
                    value={modalData ? modalData.data.raiting : ''}
                ></bdb-at-input>
                </div>
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