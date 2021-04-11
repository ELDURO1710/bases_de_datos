import React, {useState} from 'react'

import axios from 'axios'
export const Registroinfo = () => {
  const urlbase = `localhost:5000`;
  const [documento, setDocumento] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')



    const guardabase = async () => {
        const res = await axios.post('/basedatos/insertarpacientes', { numid: documento, nombre, apellido });
        console.log(res.data)
        setDocumento('')
        setNombre('')
        setApellido('')

      }

    const borrardebase = async (id) => {
        const res = await axios.post(`${urlbase}/basedatos/borrarpacientes`, {numid:id});
        console.log(res.data)
        setDocumento('')
        setNombre('')
        setApellido('')

      }

    const consultarbase = async () => {
        const res = await axios.post('/basedatos/consultatotalpacientes', { numid: documento });
        console.log(res.data)
        setDocumento('')
        setNombre('')
        setApellido('')

      }

    const actualizarbase = async () => {
        const res = await axios.post('/basedatos/actualizarpacientes', { numid: documento, nombre, apellido });
        console.log(res.data)
        setDocumento('')
        setNombre('')
        setApellido('')

      }
    
      const onChangedc = (e) => {
        setDocumento(e.currentTarget.value);
        console.log(documento)
      };
    
      const onChangenm = (e) => {
        setNombre(e.currentTarget.value);
        console.log(nombre)
      };  

      const onChangeap = (e) => {
        setApellido(e.currentTarget.value)
      }

      const inserta = () => {
        console.log('Se hizo click para insertar');
         guardabase()
      }

      const borrar = (id) => {
        console.log('Se hizo click para borrar');
         borrardebase(id)
      }

      const consultar = () => {
        console.log('Se hizo click para consultar');
         consultarbase()
      }

      const actualizar = () => {
        console.log('Se hizo click para actualizar');
         actualizarbase()
      }
    return (
        <div  className="formdb__box-containter">
            <h3 className="auth__title">Envio INFO</h3>
            <form>
               <input 
                className="auth__input"
                type="text"
                placeholder="documento"
                name="documento"
                value={documento}
                autoComplete="off"
                onChange={onChangedc}
                />
            

            <input 
                className="auth__input"
                type="text"
                placeholder="nombre"
                name="nombre"
                value={nombre}
                autoComplete="off"
                onChange={onChangenm}
                />
               <input 
                className="auth__input"
                type="text"
                placeholder="apellido"
                name="apellido"
                value={apellido}
                onChange={onChangeap}
                autoComplete="off"
                />

                
                
                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>inserta()}
                > 
                enviar info
                </button>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>borrar(documento)}
                > 
                borrar
                </button>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>consultar()}
                > 
                consultar id
                </button>

                <button
                className="btn btn-primary" 
                type="button"
                onClick={()=>actualizar()}
                > 
                actualizar datos
                </button>    
            </form>
        </div>
    )
}
