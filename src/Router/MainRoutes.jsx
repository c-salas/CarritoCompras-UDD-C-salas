import { Routes, Route } from "react-router-dom";
import { Portada } from '../Components/Portada'
import { CatalogoMostrar } from '../Components/CatalogoMostrar'
import { VerCarro } from '../Components/VerCarro'
import { IniciarSesion } from "../Components/IniciarSesion";
import { CrearCuenta } from "../Components/CrearCuenta"
import { PagarCarro } from "../Components/PagarCarro";
import { Exito } from "../Components/Exito"

export const MainRoutes = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  console.log  ('MAINROUTES *** /// +++')
  return (
    <Routes>
      <Route path='/' element={<Portada                                 nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />


      <Route path='/catalogomostrar/' element={<CatalogoMostrar         nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />
      <Route path='/vercarro' element={<VerCarro                        nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />

      <Route path='/pagarcarro' element={<PagarCarro                    nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />

      <Route path='/exito' element={<Exito                              nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} /> 

      <Route path='/iniciarsesion' element= {<IniciarSesion             nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />
      <Route path='/crearcuenta' element={<CrearCuenta                  nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
};

