import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { FiUpload } from 'react-icons/fi'

import './styles.css'

interface Props {
    onFileUploaded : (file: File) => void //retorna void pq setState do useState n tem retorno
}

const Dropzone: React.FC<Props> = ({ onFileUploaded })=> {
    const [selectedFileUrl, setSelectedFileUrl] = useState("")

    const onDrop = useCallback (acceptedFiles => {
        const file = acceptedFiles[0]

        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
    }, [onFileUploaded])
    
    const { getRootProps, getInputProps, /*isDragActive*/ } = useDropzone({ 
        onDrop,
        accept: 'image/*' //aceita upload de qualquer tipo de imagem
    })

    return(
        <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} accept='image/*'/*a props accept deixa cinza oq n é imagem qd abre para seleção / 
            multiple na props faz receber mais de um */ />
            
            { selectedFileUrl?
                <img src ={selectedFileUrl} alt='Point Thumb' />:   
                <p>
                    <FiUpload />
                    Imagem do estabelecimento
                </p>
            }

        </div>
    )
}

export default Dropzone
    

/* {
        isDragActive?
            <p>Drop the files here...</p>:
            <p>Drag 'n' drop some files here, or click to select files</p>
} */