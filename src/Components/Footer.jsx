import "./Footer.css"

export const Footer = () =>{
    return(
        <>
            <div className="FooterContent">

               <div className="footer-container">
			    	<div className="footer-column">
				    		<h4>NOSOTROS</h4>
					    	<a href="#">Acerca de</a>
						    <a href="#">Trabaja con nosotros</a>
						    <a href="#">Voluntarios</a>
				    </div>
			    	<div className="footer-column">
				    		<h4>COMUNIDAD</h4>
					    	<a href="#">Clientes</a>
					    	<a href="#">Publicidad</a>
						    <a href="#">Proveedores</a>
				    </div>
				    <div className="footer-column">
					    	<h4>ENLACES ÚTILES</h4>
						    <a href="#">Ayuda</a>
						    <a href="#">Refugio</a>
				    </div>
				    <div className="footer-column-social-icons">
                        <a href=""><img className="social" src="assets/images/instagram.svg" alt="" /></a><h2 className="h2-footer"></h2>
                        <a href=""><img className="social" src="assets/images/twitter.svg" alt="" /></a><h2 className="h2-footer"></h2>
                        <a href=""><img className="social" src="assets/images/facebook.svg" alt="" /></a><h2 className="h2-footer"></h2>

		    	    </div>
		        </div>
		        <div class="footer-bottom">
			        <p class="#">© 2023 pagina ficticia hecha solo con propositos educativos </p>
                </div>

            </div>

        </>
    )
}