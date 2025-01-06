import React, { use, useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { useNavigate } from 'react-router-dom';

// function isValidHttpUrl(link) {
//     if (typeof link !== "string") {
//         return false;
//     }

//     const regex = /^(http|https):\/\//;
//     return regex.test(link);
// }

export const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    const [error, setError] = useState(null)

    const isValidHttpUrl = useCallback(() => {
        if (typeof link !== "string") {
            return false;
        }

        const regex = /^(http|https):\/\//;
        return regex.test(link);
    }, [link]);

    const submitHandler = async event => {
        event.preventDefault()

        if (! isValidHttpUrl()) {
            setError('Invalid link. Link must start with http:// or https://');
        }

        try {
            const data = await request(
                '/api/link/generate',
                'POST',
                { from: link },
                { Authorization: `Bearer ${auth.token}` })

            navigate(`/details/${data.link._id}`)
        } catch (e) { }
    }
    const pressHandler = async event => {
        setError(null)
        if (event.key === 'Enter') {
            event.preventDefault()
            submitHandler(event)
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className='col s6 offset-s3' style={{marginTop: '2rem'}}>
                <form action='' onSubmit={submitHandler}>
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
                        <div className='red-text'>{error}</div>
                    </div>
                    <button className='btn yellow darken-4' type='submit'>Create</button>
                </form>
            </div>
        </div>
    )
}
