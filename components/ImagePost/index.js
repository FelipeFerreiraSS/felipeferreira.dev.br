import { PostImg } from './styles.js'

export default function ImagePost({ id, alt }) {
    return (
        <PostImg>
            <img src={id} alt={alt}/>
        </PostImg>
    )
}