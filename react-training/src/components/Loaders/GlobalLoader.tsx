function GlobalLoader({isLoading}:{isLoading: boolean}) {
    if(isLoading) {
        return (
        <p style={{position:'fixed', top: 0}}>
            <span><strong>Loading...</strong></span>
        </p>
        )
    } else {
        return ('')
    }    
}
export default GlobalLoader