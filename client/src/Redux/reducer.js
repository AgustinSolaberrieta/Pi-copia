import { CLEAN_DETAIL, GET_DRIVERS,GET_DRIVERS_DETAIL, SEARCHBAR, SET_ORDER_BY_ASC, SET_ORDER_BY_DESC, ORDERCARD_DOB_ASC, ORDERCARD_DOB_DESC, CREATE_DRIVER, GET_TEAM, FILTER_BY_DB, FILTER_BY_API, FILTER_TEAM} from "./action-types";

const initialState={
    drivers: [],
    driversDetail : {},
    teams:[],
    copyDrivers: []
    
    
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case GET_DRIVERS:
            return{
                ...state,
                drivers: action.payload,
                copyDrivers: action.payload
            }  

        case GET_DRIVERS_DETAIL:
            return{
                ...state,
                driversDetail: action.payload
            }    
        case CLEAN_DETAIL:
        return{
           ...state,
           driversDetail: {}

        }
        case SEARCHBAR:
            return{
                ...state,
                drivers: action.payload
            }

         
        case CREATE_DRIVER:
          return{
            ...state,
            drivers: [...state.drivers, action.payload.data],
            copyDrivers: [...state.drivers, action.payload.data]

          }  
          
          case GET_TEAM :
            const sortedTeams = action.payload.sort((a, b) => {
              const nameA = a.name.toLowerCase(); //convierte en minuscula para comparar 
              const nameB = b.name.toLowerCase();
    
             if (nameA < nameB) return -1;
             if (nameA > nameB) return 1;
              return 0;
             });
            return{
              ...state,
              teams: sortedTeams
            }  

            case SET_ORDER_BY_ASC:
                const sortedByNameAsc = [...state.drivers.data].sort((a, b)=>{
                            return a.name.localeCompare(b.name)
                        }); // unexpected lexical declaration in case block
                        return {
                            ...state,
                            drivers: {
                              ...state.drivers,
                              data: sortedByNameAsc
                            }
                          };

             //ORDEN 
        case SET_ORDER_BY_DESC:
           const sortedByNameDesc = [...state.drivers.data].sort((a, b)=>{
           return b.name.localeCompare(a.name)
            }); 
              return {
               ...state,
                drivers: {
                  ...state.drivers,
                   data: sortedByNameDesc
                }
              };    

        case ORDERCARD_DOB_ASC:
            const sortedByDOBAsc = [...state.drivers.data].sort((a, b) => {
                const dateA = new Date(a.dob); // Supongamos que la fecha de nacimiento está en formato 'YYYY-MM-DD'
                const dateB = new Date(b.dob);
                return dateA - dateB;
              });
              return {
                ...state,
                drivers: {
                  ...state.drivers,
                  data: sortedByDOBAsc
                }};

        case ORDERCARD_DOB_DESC:
            const sortedByDOBDesc = [...state.drivers.data].sort((a, b) => {
                const dateA = new Date(a.dob); // Supongamos que la fecha de nacimiento está en formato 'YYYY-MM-DD'
                const dateB = new Date(b.dob);
                return  dateB - dateA;
              });
              return {
                ...state,
                drivers: {
                  ...state.drivers,
                  data: sortedByDOBDesc
                }};  
            


        // FILTROS
        case FILTER_BY_DB: 
        const searchBd = [...state.copyDrivers.data].filter(driver => driver.createdAt )
        return {
          ...state, 
          drivers:{
            ...state.copyDrivers,
            data: searchBd
          }
        }

        case FILTER_BY_API:
          const searchApi= [...state.copyDrivers.data].filter(driver => !driver.createdAt)
          return{
            ...state,
            drivers:{
              ...state.copyDrivers,
              data: searchApi
            }
          }

          case FILTER_TEAM:
            const selectedTeam = action.payload; // Supongamos que action.payload contiene el nombre del equipo seleccionado
          
            if (selectedTeam) {
              const selectedTeamArray = selectedTeam.split(',').map(team => team.trim());
              console.log(selectedTeamArray);
          
              // Ahora, filtra los conductores por los equipos seleccionados
              const filteredByTeam = state.copyDrivers.data.filter(driver => {
                const driverTeams = driver.Teams ? driver.Teams.split(',').map(team => team.trim()) : [];
                return driverTeams.some(driverTeam => selectedTeamArray.includes(driverTeam));
              });
          
              return {
                ...state,
                drivers: {
                  ...state.copyDrivers,
                  data: filteredByTeam,
                },
              };
           }
          








        
            
       
        default:
            return {...state}
    }
}
export default reducer;