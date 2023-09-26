
interface Props { 
    isToggled:boolean,
    onToggle:()=>void
}
const CheckBox:React.FC<Props> = ({isToggled, onToggle}) => {
    const toggledClass = isToggled ? "checked" : ""
    const checkboxClass = "checkbox " + toggledClass;


    return(
        <div onClick={e=>onToggle()} className={checkboxClass}>
            <span className="checkmark">🍺</span>
        </div>
        
    )
}


export default CheckBox;