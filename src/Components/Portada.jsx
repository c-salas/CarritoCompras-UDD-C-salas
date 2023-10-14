import { useNavigate } from 'react-router-dom';
import "./Portada.css";

export const Portada = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

  console.log ('PORTADA *** /// +++')

  const rutaActual = '/'
  sessionStorage.setItem('rutaActual', rutaActual);
  
  const handleClick = () => {
    navigate('/catalogo');
  }

  return (

    <div>
    <center><img className="MainLogo" src="assets/images/CoffeeCats_Main_4Color.png" alt="logo"  /></center>
        <center> <h2>Avenida Siempreviva 742, Santiago</h2> </center>
        <center><h2>Lunes a Sabado 10:00 a 20:00</h2></center>
  </div>

  );
};
