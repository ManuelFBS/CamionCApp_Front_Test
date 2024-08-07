
// import { useState } from "react";
// import Tractomulas from "../../components/Tractomulas";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight, faTruck, faGasPump, faTruckFront } from "@fortawesome/free-solid-svg-icons";


// export function HomePage() {

// const [showTractomulas, setShowTractomulas] = useState(false);

// const handleShowTractomulas= ()=>{
//   setShowTractomulas(true);
// }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//     <h1 className="text-3xl font-bold text-center mb-6">
//       Página Principal
//     </h1>
    
//     <div className="flex flex-col items-center space-y-4">
//       <button
//       onClick={handleShowTractomulas}
//       className="flex items-center justify-between bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors relative"
//       style={{ width: 'auto', minWidth: '500px' }} 
//       >
//       <FontAwesomeIcon icon={faTruckFront} className="text-2xl mr-3" />      
//       <span className="flex-grow text-center">CARGA PESADA</span>      
//       <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
//     </button>

//       <button
//       className="flex items-center justify-between bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors relative"
//       style={{ width: 'auto', minWidth: '500px' }} 
//     >
//       <FontAwesomeIcon icon={faTruck} className="text-2xl mr-3" />      
//       <span className="flex-grow text-center">VOLQUETAS</span>      
//       <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
//     </button>

//       <button
//       className="flex items-center justify-between bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors relative"
//       style={{ width: 'auto', minWidth: '500px' }} 
//     >
//       <FontAwesomeIcon icon={faGasPump} className="text-2xl mr-3" />      
//       <span className="flex-grow text-center">TANQUEO</span>      
//       <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
//     </button>      
//     </div>    
    
//     {showTractomulas && <Tractomulas />}
//   </div>
//   );
// }

import { Link } from 'react-router-dom'; // Importa Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTruck, faGasPump, faTruckFront } from "@fortawesome/free-solid-svg-icons";

export function HomePage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
     
      
      <div className="flex flex-col items-center space-y-4">
        <Link
          to="/formtractomulas"
          className="flex items-center justify-between bg-white text-red-500 px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:text-white transition-colors relative"
          style={{ width: 'auto', minWidth: '500px' }}
        >
          <FontAwesomeIcon icon={faTruckFront} className="text-2xl mr-3" />      
          <span className="flex-grow text-center">CARGA PESADA</span>      
          <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
        </Link>

        <Link
          to="/formtractomulas"
          className="flex items-center justify-between bg-white  text-red-500 px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:text-white transition-colors relative"
          style={{ width: 'auto', minWidth: '500px' }}
        >
          <FontAwesomeIcon icon={faTruck} className="text-2xl mr-3" />      
          <span className="flex-grow text-center">VOLQUETAS</span>      
          <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
        </Link>

        <Link
          to="/formtractomulas"
          className="flex items-center justify-between bg-white text-red-500 px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:text-white transition-colors relative"
          style={{ width: 'auto', minWidth: '500px' }}
        >
          <FontAwesomeIcon icon={faGasPump} className="text-2xl mr-3" />      
          <span className="flex-grow text-center">TANQUEO</span>      
          <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
        </Link>      
      </div>
    </div>
  );
}
