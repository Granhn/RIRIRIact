const Button = ({children , clickEvent}) =>  {

    return(
        <button className="button" onClick={clickEvent}>{children}</button>
    )
}

export default Button