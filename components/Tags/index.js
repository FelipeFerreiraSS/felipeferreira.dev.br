import Link from "next/link";

import { ListTags } from './styles.js'
import { Button } from "../../styles/home.js";

export default function Tags() {
    return (
        <ListTags>
            <Button>
                <Link href={"/blog/tags/react"}>
                    <button>react</button>   
                </Link>
                <Link href={"/blog/tags/javascript"}>
                    <button>javascript</button>        
                </Link>
                <Link href={"/blog/tags/css"}>
                    <button>css</button>        
                </Link>
            </Button>
        </ListTags>
    )
}