import Link from "next/link";

import { ListTags } from './styles.js'

export default function Tags() {
    return (
        <ListTags>
            <div>
                <Link href={"/blog/tags/css"}>
                    <button>CSS</button>   
                </Link>
                <Link href={"/blog/tags/nextJs"}>
                    <button>Next Js</button>        
                </Link>
                <Link href={"/blog/tags/styledComponents"}>
                    <button>Styled Components</button>        
                </Link>
            </div>
        </ListTags>
    )
}