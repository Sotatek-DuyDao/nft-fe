import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req, res) => {
    const { headers } = req
    try {
        const { data, headers: returnedHeaders } = await axios.post(
            'http://localhost:3001/auth/refresh-token', // refresh token Golang server path
            undefined,
            {
                headers,
            },
        )

        //  Update headers on requester using headers from Golang server response
        Object.keys(returnedHeaders).forEach(key =>
            res.setHeader(key, returnedHeaders[key]),
        )

        res.status(200).json(data)
    } catch (error) {
        // we don't want to send status 401 here.
        res.send(error)
    }
}