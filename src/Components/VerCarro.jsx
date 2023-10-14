import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/productContext';
import './VerCarro.css'

export const VerCarro = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    console.log ('>>> VER carro')
    const navigate = useNavigate();

    const [estado, setEstado] = useState (false)

    const [totalArticulos, setTotalArticulos] = useState (0)
    const [totalPesos, setTotalPesos] = useState (0)
    const [totalCarro, setTotalCarro] = useState ([])

    const rutaActual   = '/vercarro'
    sessionStorage.setItem ('rutaActual', rutaActual)

    window.scrollTo(0, 0);

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const consolidaCarro = () => {
    if (localStorage.getItem('carroCompras') !== null) 
    {
        let carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
        for (let i = 0; i < carroCompras.length - 1; i++) {
            for (let j = i+1;  j < carroCompras.length; j++) {
                if (carroCompras[i].codigo == carroCompras[j].codigo) {
                    carroCompras[i].cantidad = carroCompras[i].cantidad + carroCompras[j].cantidad
                    carroCompras[j].cantidad = 0
                }
            }
        }

            let  totalCarroAux = []
            for (let i = 0; i < carroCompras.length; i++) {
                const codigo   = parseInt(carroCompras[i].codigo)
                const cantidad = parseInt(carroCompras[i].cantidad)
                if (cantidad !== 0)
                {
                    setEstado (true)
                    const precio  = productos[codigo-1].precio
                    const subTotal = cantidad * precio
                    setTotalArticulos (contador => contador + cantidad)
                    setTotalPesos (contador => contador + subTotal)
                    totalCarroAux.push ({ codigo, cantidad, precio, subTotal })
                }
            }
            carroCompras = totalCarroAux.map (articulo => ({ codigo: articulo.codigo, cantidad: articulo.cantidad }))
            localStorage.setItem('carroCompras', JSON.stringify(carroCompras))
            setTotalCarro (totalCarroAux)
        }
        
        }

        useEffect (() => {
            consolidaCarro ()
        },[])


    const restaUno = (event, index) => {
        event.preventDefault();
    
        let totalCarroAux = [...totalCarro]
        const cantidadAux = totalCarroAux[index].cantidad

        if (cantidadAux == 1) return;

        totalCarroAux[index].cantidad = cantidadAux - 1
        totalCarroAux[index].subTotal =  totalCarroAux[index].cantidad *  totalCarroAux[index].precio

        const totalArticulosAux = totalArticulos -1
        const totalPesosAux = totalPesos - totalCarroAux[index].precio

        updateUserCart  (totalArticulosAux)
        setTotalCarro (totalCarroAux)
        setTotalArticulos (totalArticulosAux)
        setTotalPesos (totalPesosAux)

        const carroCompras = totalCarroAux.map(objeto => ({ codigo: objeto.codigo, cantidad: objeto.cantidad }))
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }
    
    const sumarUno = (event, index) => {
        event.preventDefault();

        const codigo = totalCarro[index].codigo
        const maximo = productos [codigo-1].stock
    
        let totalCarroAux = [...totalCarro]
        const cantidadAux = totalCarroAux[index].cantidad

        if (cantidadAux == maximo) return;

        totalCarroAux[index].cantidad = cantidadAux + 1
        totalCarroAux[index].subTotal =  totalCarroAux[index].cantidad *  totalCarroAux[index].precio

        const totalArticulosAux = totalArticulos + 1
        const totalPesosAux = totalPesos + totalCarroAux[index].precio

        updateUserCart  (totalArticulosAux)
        setTotalCarro (totalCarroAux)
        setTotalArticulos (totalArticulosAux)
        setTotalPesos (totalPesosAux)

        const carroCompras = totalCarroAux.map(objeto => ({ codigo: objeto.codigo, cantidad: objeto.cantidad }))
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }


    const eliminaProduct = (event, index) => {
        event.preventDefault();

        const NewTotalArticulos = totalArticulos - totalCarro[index].cantidad
        setTotalArticulos (NewTotalArticulos)
        updateUserCart (NewTotalArticulos)
        const NewTotalPesos = totalPesos - totalCarro[index].subTotal
        setTotalPesos (NewTotalPesos)

        if (NewTotalArticulos == 0) {
            updateCartState(false)
            setEstado (false)
        }
        totalCarro.splice(index, 1)

        const carroCompras = totalCarro.map(objeto => ({ codigo: objeto.codigo, cantidad: objeto.cantidad }));
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }


    const seguirComprando = (event) => {
        event.preventDefault();
        const rutaCatalogo = sessionStorage.getItem ('rutaCatalogo')
        navigate (rutaCatalogo);
    }


    const irAPagar = (event) => {
        event.preventDefault();

        if (cartState == false || userCart == 0) {
            alert ('Carro está vacío')
        } else {
            const queryString = `/pagarcarro`;
            navigate (queryString)
        }
    }


    return (
    <div className='ver_carro'>

           <br />
            <div className="container" >
                <div className='flex' style={{marginLeft: "0px", marginRight: "0px"}} >
                    {totalCarro.map ((celda, index) => (
                    <div className="catalogo_carro" style={{backgroundColor: "white"}} key={index}>
                        <div className='productcard'>
                            <img data-id={index} src={productos[celda.codigo-1].url} width={100}> 
                            </img> <br/> <br/>
                            <button className= 'BtnCar1 p-2 rounded-2' style={{ width: "40px", fontSize: "14px", marginRight: "1rem"}} onClick={(event) => restaUno (event, index)}> - </button>
                            {celda.cantidad}
                            <button className= 'BtnCar1 p-2 rounded-2' style={{ width: "40px", fontSize: "14px", marginLeft: "1rem"}} onClick={(event) => sumarUno (event, index)}> + </button> 
                        </div>
                        <br/>
                        <div className='productpricing'>
                            {productos[celda.codigo-1].Nombre} <br/>
                            ${celda.subTotal.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} &nbsp;&nbsp;
                            <a style={{ cursor: 'pointer' }} onClick={(event) => eliminaProduct (event, index)}>🗑️</a>
                        </div>
                        

                    </div>
                    ))}
                    <br /><br />
                </div> <br />
            </div>
            <br />
            <div className="container">

    
            <br/>
            <div className="row">
                <div className="col col-md-auto" style={{textAlign: "left", width: "400px"}}>
                    <h4>Subtotal &nbsp; ${totalPesos.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )}</h4>
                </div>
                <div className="col col-md-auto" style={{textAlign: "left"}}>
                {estado && <button type="button" className="BtnCar1 p-2 rounded-2" style={{width: "200px"}} onClick={irAPagar}>Continuar con el pago</button>} <br/>                
                     <button type="button" className="BtnCar2 p-2 rounded-2" style={{width: "200px"}} onClick={seguirComprando}>Seguir mirando</button>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}
