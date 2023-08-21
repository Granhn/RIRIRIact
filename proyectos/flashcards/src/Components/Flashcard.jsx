
const Flashcard = ({ question, actualCard, setSelected }) =>{
    const handleClick = (e, id) => {
        setSelected(e, id)
    }
    return(

        <div className={question.id === actualCard ? "selected": "" } onClick={e => handleClick(e,question.id)}>
            <p>{question.id === actualCard ? question.answer : question.question}</p>
        </div>
    )
}
export default Flashcard