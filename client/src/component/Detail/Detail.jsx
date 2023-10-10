// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDriversDetail, cleanDetail } from "../../Redux/action";
// import { useEffect } from "react";
// import "./Detail.css"

// const Detail = () => {
//     console.log("Componente Detail se está renderizando");

//     const dispatch = useDispatch();
//     const characterDetail = useSelector(state => state.driversDetail);

//     const { id } = useParams();

//     console.log(characterDetail);

//     useEffect(() => {
//         dispatch(getDriversDetail(id))
//         return dispatch(cleanDetail())
//     }, [dispatch, id]);

//     return (
//         <div className="detail-frame">
           
//             {characterDetail ? (
//                 <>
//                   <div className="detail-image">
//                    <img src={characterDetail.image} ></img>  
//                  </div>
//                  <div className="detail-info">
//                     <h2 className="detail-title">{characterDetail.name} {characterDetail.surname}</h2>
//                     <p>{characterDetail.dob}</p>
//                     <p>{characterDetail.nationality}</p>
//                     <p>{characterDetail.Teams}</p>
//                     <p>{characterDetail.description}</p>
//                     <p>{characterDetail.id}</p>
//                 </div>
//                 </>
//             ) : (
//                 <p>Cargando detalle...</p>
//             )}
//         </div>
//     )
// }

// export default Detail;
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDriversDetail, cleanDetail } from "../../Redux/action";
import { useEffect } from "react";
import "./Detail.css";
import logof1 from "./formula1-removebg-preview.png"

const Detail = () => {
  const dispatch = useDispatch();
  const handleBack = () => {
    window.history.back();
}

  const characterDetail = useSelector((state) => state.driversDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDriversDetail(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);

  return (
    <div className="contenedor">
    <button onClick={handleBack} className="logOut" style={{ marginLeft: 'auto' }}>BACK</button>
    <div className="detail-container">
      {characterDetail ? (
        <>
          <div className="detail-content">
            <div className="detail-image">
              <img src={characterDetail.image} alt={characterDetail.name} />
            </div>
            <div className="detail-info">
              <h2 className="detail-title">
                {characterDetail.name} {characterDetail.surname}
              </h2>
              <p>{characterDetail.dob}</p>
              <p>{characterDetail.nationality}</p>
              <p>{characterDetail.Teams}</p>
              <p>{characterDetail.description}</p>
              <p>{characterDetail.id}</p>
            </div>
            <div className="logof1">
  <img src={logof1} alt="Logo" />
</div>
          </div>
        </>
      ) : (
        <p>Cargando detalle...</p>
      )}
    </div></div>
  );
};

export default Detail;
