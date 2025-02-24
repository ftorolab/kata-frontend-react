import React from "react";

function Page() {
    return (
        <div className="container">
            <bdb-tp-empty-state
                show-icon
                is-logo={true}
                type-logo="BDBFULL"
                err-title="¡Ay, no! Esta página se nos perdió entre la caja fuerte"
                err-desc="Lo sentimos, vuelve a intentarlo más tarde."
                type-img='404-error'
                desc="Todos Los Derechos Reservados.  2023 © Banco de Bogotá.">
            </bdb-tp-empty-state>
        </div>
    )
}
export default Page