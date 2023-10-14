import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../Context/productContext';
import jwt_decode from "jwt-decode"
import { PaypalButton } from './Paypal/PaypalButton'
import './PagarCarro.css'

export const PagarCarro = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();

    const [pagarPaypal, setPagarPaypal] = useState (0)

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const [totalNeto, setTotalNeto] = useState (0)
    const [totalIVA,  setTotalIVA] = useState (0)
    const [totalPesos, setTotalPesos] = useState (0)
    const [gastosDeEnvio, setGastosDeEnvio] = useState (0)
    const [totalTotal, setTotalTotal] = useState (0)

    const [estado, setEstado] = useState (false)
    const [enviaADomicilio, setenviaADomicilio] = useState (false)
    const [retiraEnTienda,  setRetiraEnTienda]  = useState (false)

    const initialUpdateForm = {
        nombre:   '',
        apellido: '',
        rut:      '',
        email:    '',
        password: '',
        direccion: '',
        comuna: '',
        ciudad: '',
        region: '',
        telefono: '',
    }
    const [updateForm, setUpdateForm] = useState (initialUpdateForm)

    const rutaActual   = '/pagarcarro'
    sessionStorage.setItem ('rutaActual', rutaActual)


    const leerUsuario = () => {
        if (localStorage.getItem('token') !== null) {
            const tokenString = localStorage.getItem('token')
            const decoded = jwt_decode (tokenString)
            console.log ("Decoded: ", decoded)
            setUpdateForm ({...decoded.data})
        }
    }


    useEffect (() => {
        leerUsuario ()
    },[])


    const calculaValores = () => {
        let suma = 0
        const carroCompras = JSON.parse(localStorage.getItem('carroCompras'));

        for (let i = 0; i < carroCompras.length; i++) {
            const codigo   = parseInt(carroCompras[i].codigo)
            const cantidad = parseInt(carroCompras[i].cantidad)
            const precio   = productos[codigo-1].precio
            const subTotal = cantidad * precio
            suma = suma + subTotal
        }

        const pesos = suma
        setTotalPesos (suma)
        const neto = Math.round (pesos / 1.19)
        setTotalNeto (neto)
        const iva = Math.round (pesos - neto)
        setTotalIVA  (iva)
        const transporte = 0
        setGastosDeEnvio (transporte)
        const grandTotal = pesos + gastosDeEnvio
        setTotalTotal (grandTotal)

        const totalValueAux = (grandTotal / 900)
        const totalValueRnd = parseFloat(totalValueAux.toFixed(2))
        setPagarPaypal (totalValueRnd)
    }


    useEffect (() => {
        calculaValores ()
    },[updateForm])


    const handleupdateFormChange = (event) => {
        const keyForm   = event.target.name
        const valueForm = event.target.value
        console.log (keyForm, valueForm)
        setUpdateForm ({ ...updateForm, [keyForm]: valueForm })
    }


    const envioDomicilio = async (event) => {
        event.preventDefault()
        if (!enviaADomicilio) {
            const transporte = 1990
            setGastosDeEnvio (transporte)
            const grandTotal = totalPesos + transporte
            setTotalTotal (grandTotal)
        }
        setenviaADomicilio (true)
        setRetiraEnTienda (false)
    }


    const retiraTienda = async (event) => {
        event.preventDefault()
        if (!retiraEnTienda) {
            const transporte = 0
            setGastosDeEnvio (transporte)
            const grandTotal = totalPesos
            setTotalTotal (grandTotal)
        }
        setRetiraEnTienda (true)
        setenviaADomicilio (false)
    }


    const irAPagar = async (event) => {
        event.preventDefault()
            if (enviaADomicilio || retiraEnTienda) {
            setEstado (true)
        } else {
            alert ('Debe seleccionar un tipo de despacho')
        }
 
    }


    const regresar = async (event) => {
        event.preventDefault()
        const rutaCatalogo = sessionStorage.getItem ('rutaActual')
        navigate (rutaCatalogo);
    }


return (
    <div className="pagar_carro">
    <br/>
    <div className="row">
    <br/> <br/>
    <div className="containerShop1">
    <br/>

    <br/>
    <div className="bs-warning-rgb" style={{borderRadius: "2%", color: "black", textAlign: "center"}}>
        <div className="container text-center">
            <br/>
            <div className="rowContainer">
                <div className="col col-md-auto" style={{textAlign: "left", width: "150px"}}>
                    <h4>Neto</h4>
                    <h4>IVA</h4>
                    <h4>SubTotal</h4>
                    <h4>Costos de Envío</h4>
                    <h4>Total</h4>
                </div>
                <div className="col col-md-auto" style={{textAlign: "right", width: "150px"}}>
                    <h4>$ {totalNeto.toLocaleString('es-CL', {style: 'decimal'})} </h4>
                    <h4>$ {totalIVA.toLocaleString('es-Cl',  {style: 'decimal'})} </h4>
                    <h4>$ {totalPesos.toLocaleString('es-CL',{style: 'decimal'})} </h4>
                    <h4>$ {gastosDeEnvio.toLocaleString('es-CL',{style: 'decimal'})} </h4>
                    <h4>$ {totalTotal.toLocaleString('es-CL',{style: 'decimal'})} </h4>
                </div>
            </div>
        </div>
        <br/>
    </div>
    <br/>
    { estado && <PaypalButton invoice = {'CD 1 \n CD2'} totalValue = {pagarPaypal} /> }
    </div>

    <br/><br/>

    <div className="containerShop1">
        <div className='container'>
        <br/>
        <h4 className='infoEnvio'>Información de envío</h4>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="row">
                <div className="col col-auto" >
                    {!enviaADomicilio && <button type="button" className="BtnCar1 p-2 rounded-2"   style={{width: "250px", paddingLeft: "20px", paddingRight: "20px"}} onClick= { envioDomicilio }>Envío a domicilio</button>}
                    { enviaADomicilio && <button type="button" className="BtnCar1 p-2 rounded-2" style={{width: "250px", paddingLeft: "20px", paddingRight: "20px"}}>Envío a domicilio</button>}
                    {!retiraEnTienda  && <button type="button" className="BtnCar1 p-2 rounded-2"   style={{width: "250px", marginLeft: "20px"}} onClick={ retiraTienda }>Retiro en tienda</button>}
                    { retiraEnTienda  && <button type="button" className="BtnCar1 p-2 rounded-2" style={{width: "250px", marginLeft: "20px"}}>Retiro en tienda</button>}
                </div>
                <br/><br/><br/>
            </div>
        </div>

        <form>
            <div className="row g-1">
                <div className="col-sm">
                    <label  form="nombre" className="form-label">Nombre</label>
                    <input  type="text"
                        name="nombre"
                        className="form-control" 
                        id="nombre"  
                        aria-label="nombre"
                        value={updateForm.nombre}
                        onChange={handleupdateFormChange} />
                </div>
                <div className="col-sm">
                    <label  form="apellido" className="form-label">Apellido</label>
                    <input  type="text" 
                            name="apellido"
                            className="form-control" 
                            id="apellido"  
                            aria-label="apellido"
                            value={updateForm.apellido}
                            onChange={handleupdateFormChange} />
                </div>

        <div className="row g-1">
            <label form="direccion" className="form-label">Dirección</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={updateForm.direccion}
                    onChange={handleupdateFormChange}  />
        </div>

        <div className="row g-1">
            <div className="col-sm">
                <label form="comuna" className="form-label">Comuna</label>
                <input type="text"  name="comuna" className="form-control" id="comuna" value={updateForm.comuna}
                    onChange={handleupdateFormChange}  />
            </div>
            <div className="col-sm">
                <label form="ciudad" className="form-label">Ciudad</label>
                <input type="text" name="ciudad" className="form-control" id="ciudad"  value={updateForm.ciudad}
                        onChange={handleupdateFormChange}   />
            </div>
        </div>

            <div className="row g-1">
            <div className="col-sm">
                <label form="region" className="form-label">Region</label>
                <input type="text" name="region" className="form-control" id="region"  value={updateForm.region}
                        onChange={handleupdateFormChange}  />
            </div>
            <div className="col-sm">
                <label form="telefono" className="form-label">Teléfono</label>
                <input type="text" name="telefono" className="form-control" id="telefono"  value={updateForm.telefono}
                        onChange={handleupdateFormChange}  />
            </div>
        </div>

        
        </div>
        <div className="row">
            <div className="col col-md-auto" >
                <button type="button" className="BtnCar1 p-2 rounded-2" style={{width: "250px", marginLeft: "20px", marginTop: "20px"}} onClick= { regresar }>Regresar sin comprar</button>
                <button type="button" className="BtnCar1 p-2 rounded-2" style={{width: "250px", marginLeft: "20px"}} onClick= { irAPagar }>Pagar</button>
            </div>
            <br/>
        </div>
    </form>
    <br/>
    </div>
    </div>
    


    </div>
    <br/>
    </div>
)
}
