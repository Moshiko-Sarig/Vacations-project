import Vacation from "../Models/Vaction";

function VacationReducer(state:Vacation[] =[], action: { type: string, Vacations: Vacation[] }) {
    switch (action.type) {
        case "Update-Vacations":
            return action.Vacations
        case "Delete-Vacations":
            return []
        default:
            return(state)
}
}

export default VacationReducer;