
import PropTypes from 'prop-types';
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-1 bg-gray-100 p-4 md:p-6 lg:p-8'>{children}</main> {/* Ajusta el padding para diferentes tamaños de pantalla */}
        <Footer />
    </div>
  )
}

// Define las propTypes para el componente
Layout.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea un nodo React y es requerido
  };

export default Layout