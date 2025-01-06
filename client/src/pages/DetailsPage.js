import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailsPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const {id} = useParams()

    const fetchLink = useCallback(async () => {
        try {
            const response = await request(
                `/api/link/${id}`,
                'GET',
                null,
                {Authorization: `Bearer ${token}` }
            )
            setLink(response)
        } catch (e) {
            console.log(e)
        }
    }, [token, id, request])

    useEffect(() => {
        fetchLink()
    }, [fetchLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}
