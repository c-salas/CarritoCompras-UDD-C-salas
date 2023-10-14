import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../Context/userContext'
import './navbar.css'

export const NavBar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();
  const [buscar, setBuscar] = useState ('')
  const [state, dispatch] = useContext (UserContext)

  const location = useLocation()
  const rutaActual = location.pathname;

  const scrollPosition = window.scrollY;
  sessionStorage.setItem('scrollPosition', scrollPosition.toString());

  console.log ('NAVBAR *** /// +++', rutaActual)

   const handleChange = (event) => {
    const nuevoValor = event.target.value;
    setBuscar(nuevoValor);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validaBuscar = () => {
    console.log ('Buscar : ', buscar.length)
    const pa = 1
    sessionStorage.setItem('paginaActual', pa);
    if (buscar.length == 0 ) {
      const queryString = `/catalogo`;
      navigate( queryString );
    } else {
      const queryString = `/catalogomostrar/${buscar}`;
      navigate( queryString );
    }
  }

  const iniciarSesion = (event) => {
    event.preventDefault();


    const queryString = `/iniciarsesion/`;
    navigate( queryString );
  }

  const crearCuenta = (event) => {
    event.preventDefault();
    
    const queryString = `/crearcuenta/`;
    navigate( queryString );
  }

  const miPerfil = (event) => {
    event.preventDefault();

    const queryString = `/miperfil/`;
    navigate( queryString );

  }
  const cerrarSesion = (event) => {
    event.preventDefault();

    localStorage.removeItem ('rut')
    localStorage.removeItem ('token')
    dispatch({ type: 'LOGOUT'}) 
    updateNameState (false)
  }

  const verCarro = (event) => {
    event.preventDefault();
    navigate(`/vercarro/`);
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">


          <div className="logoNav-container" >
              <img className="logoNav" href="/" src="/assets/images/cat-silhouette.svg" alt="logo"  />
              <a className="nav-link" href="/"><h1>Coffee Cats</h1></a>
         </div>


          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Anfitriones</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalogomostrar">Catalogo</NavLink>
              </li>
              <li className="nav-item2">
                <NavLink className="nav-link" to="/vercarro">🛒</NavLink>
                <NavLink className="nav-link" to="/iniciarsesion">Login</NavLink>
                
              </li>


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
