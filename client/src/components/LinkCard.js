import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <div className="row">
            <h2>Link details</h2>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}
