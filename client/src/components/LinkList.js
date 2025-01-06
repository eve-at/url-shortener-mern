import React from 'react'
import { Link } from 'react-router-dom'

export const LinkList = ({links}) => {
    if (!links.length) {
        return <p className="center">No links yet</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>##</th>
                    <th>Original</th>
                    <th>Shortened</th>
                    <th>Created</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td><a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></td>
                            <td><a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></td>
                            <td>{new Date(link.date).toLocaleDateString()}</td>
                            <td><Link to={`/details/${link._id}`}>Details</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
