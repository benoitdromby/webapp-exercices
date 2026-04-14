function ErrorMessage({message}:{message: string}) {
    if(message.length) {
        return (
        <p style={{color:'red'}}>
            <span><strong>{message}</strong></span>
        </p>
        )
    } else {
        return ('')
    }    
}
export default ErrorMessage