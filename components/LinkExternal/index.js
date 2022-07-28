
export default function LinkExternal({ link, text }) {
    return (
        <>
            <a href={link} target="_blank">
                {text}
            </a>
        </>

    )
}