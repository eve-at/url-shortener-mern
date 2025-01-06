import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log('Pressed', auth)
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    {from: link},
                    {Authorization: `Bearer ${auth.token}`})

                navigate(`/details/${data.link._id}`)
            } catch(e) {}
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className='col s6 offset-s3' style={{marginTop: '2rem'}}>
                <form action=''>
                    <div className='input-field'>
                        <input
                            type='text'
                            id='link'
                            placeholder='Enter the link'
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyDown={pressHandler}
                        />
                        <label htmlFor='link'>Link</label>
                    </div>
                    <button className='btn yellow darken-4' type='submit'>Create</button>
                </form>
            </div>
        </div>
    )
}
