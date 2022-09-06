import { PostImg } from './styles.js'

export default function ImagePost({ id, alt }) {
    return (
        <PostImg>
            <picture>
                <img src={id} alt={alt}/>
            </picture>
        </PostImg>
    )
}