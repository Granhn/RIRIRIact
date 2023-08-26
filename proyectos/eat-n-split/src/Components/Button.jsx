const Button = ({children, onClickEvent}) =>  {

    return(
        <button className="button" onClick={onClickEvent} >{children}</button>
    )
}

export default Button  