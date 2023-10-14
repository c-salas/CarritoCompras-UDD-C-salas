import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import './CrearCuenta.css'

export const CrearCuenta = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

  const initialCreateForm = {
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
  
  const [createForm, setCreateForm] = useState (initialCreateForm)
  
  const handleCreateFormChange = (event) => {
    const keyForm   = event.target.name
    const valueForm = event.target.value
    setCreateForm ({
                    ...createForm, 
                    [keyForm]: valueForm
                })
  }

  const onSubmitCreateForm = async (event) => {
    event.preventDefault();

    const url = 'https://backend-udd-catshop.onrender.com/api/v1/users'
    try {
      const data = await axios.post(url, createForm, { headers: { "Content-Type": "application/json" } })
      console.log (data)
      const login = '/iniciarsesion'
      navigate( login );
    }
    catch (error) {
      console.log ('Codigo : ',  error.response.status)
      console.log ('Mensaje : ', error.response.data.message)
    }
  }

  return (

  <div className="iniciar_sesion">
    <br />
    <div className="contenedor_1000">
    <div className="container-md">
      <br/>
      <h2>Nueva cuenta</h2>
      <br/>

      <form>
        <div className="row g-1">
          <div className="col-sm">
            <label  form="nombre" className="form-label">Nombre</label>
            <input  type="text"
                    name="nombre"
                    className="form-control" 
                    id="nombre"  
                    aria-label="nombre"
                    value={createForm.nombre}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          <div className="col-sm">
            <label  form="apellido" className="form-label">Apellido</label>
            <input  type="text" 
                    name="apellido"
                    className="form-control" 
                    id="apellido"  
                    aria-label="apellido"
                    value={createForm.apellido}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          <div className="row g-1">
            <div className="col-sm">
            <label  form="email" className="form-label">Correo</label>
            <input  type="email" 
                    name="email"
                    className="form-control" 
                    id="email" 
                    value={createForm.email}
                    onChange={handleCreateFormChange} 
                    required />
            </div>
            <div className="col-sm">
              <label  form="rut" className="form-label">Rut</label>
              <input  type="text"
                      name="rut"
                      className="form-control"
                      id="rut"
                      value={createForm.rut}
                      onChange={handleCreateFormChange}
                      required />
            </div>
          </div>
          
          <div className="row g-1">
          <div className="col-sm">
            <label  form="password" className="form-label">Contraseña</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword"
                    value={createForm.password}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          <div className="col-sm">
            <label form="password" className="form-label">Verifique Contraseña</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword2"
                    required />
          </div>
          </div>

          <div className="row g-1">
          <div className="mb-3">
            <label form="direccion" className="form-label">Dirección</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={createForm.direccion}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          </div>

          <div className="row g-1">
            <div className="col-sm">
              <label form="comuna" className="form-label">Comuna</label>
              <input type="text"  name="comuna" className="form-control" id="comuna" value={createForm.comuna}
                      onChange={handleCreateFormChange}
                      required />
            </div>
            <div className="col-sm">
              <label form="ciudad" className="form-label">Ciudad</label>
              <input type="text" name="ciudad" className="form-control" id="ciudad"  value={createForm.ciudad}
                      onChange={handleCreateFormChange}
                      required />
            </div>
          </div>

            <div className="row g-1">
            <div className="col-sm">
              <label form="region" className="form-label">Region</label>
              <input type="text" name="region" className="form-control" id="region"  value={createForm.region}
                      onChange={handleCreateFormChange}
                      required />
            </div>
            <div className="col-sm">
              <label form="telefono" className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" id="telefono"  value={createForm.telefono}
                      onChange={handleCreateFormChange}
                      required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <br/>

            </div>
          </div>
        </div>
        <button type="submit" className="BtnCar1 p-2 rounded-2" onClick= { onSubmitCreateForm } >Continuar</button>
      </form>
      <br />
    </div>
    </div>
    <br />
  </div>

  )
}
