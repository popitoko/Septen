import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import styled from 'styled-components'

const JoditWrapper = styled.section`
  width: 100%;
  margin-left: 5%;
  margin-right: 5%;
`

export default function Jodit(props) {
  const editor = useRef(null);
  const [conteudo, setConteudo] = useState('')

  if(props.conteudo && !conteudo) setConteudo(props.conteudo)

  const config = {
    readonly: false,
    placeholder: 'Comece a criar o artigo',
    width: '90%',
    style: {
      background: 'white'
    },
    controls: {
      font: {
        list: {
          PRISTINA: "Pristina"
        }
      }
    }
  }

  return (
    <JoditWrapper>
      <JoditEditor
        ref={editor}
        value={conteudo}
        config={config}
        tabIndex={1}
        onBlur={(novoConteudo) => props.parentCallback(novoConteudo)}
        onChange={(novoConteudo) => { }}
      />
    </JoditWrapper>
  )
}