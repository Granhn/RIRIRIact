
const Flashcard = ({ question, actualCardId, setSelected }) =>{
    const handleClick = (e,id) => {
        setSelected(id !== actualCardId ? id : null)
    }
    return(

        <div className={question.id === actualCardId ? "selected": "" } onClick={e => handleClick(e,question.id)}>
            <p>{question.id === actualCardId ? question.answer : question.question}</p>
        </div>
    )
}
export default Flashcard