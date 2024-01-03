export function Button({content, handler, className}){
    return(
        <button 
            onClick={handler}
            className={className}
        >
            {content}
        </button>
    )
}