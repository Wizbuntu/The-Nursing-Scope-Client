

// import Paragraph from '@editorjs/paragraph'
// import List from '@editorjs/list'
// import Header from '@editorjs/header'
import dynamic from 'next/dynamic'

const Table = dynamic(() => import('@editorjs/table'))

export const EDITOR_JS_TOOLS = {
    table: Table,
    // paragraph: Paragraph,
    // list: List,
    // header: Header,

  }