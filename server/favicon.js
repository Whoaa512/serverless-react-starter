import fs from 'fs'
import faviconImgPath from './favicon.ico'
import {
    NOT_FOUND_RESPONSE,
    TWO_MONTHS_IN_SECONDS,
} from './lib/constants'

const faviconImg = fs.readFileSync(faviconImgPath)

export default function favicon(event, context, callback) {
    const httpMethod = event.httpMethod ? event.httpMethod : event.method
    if (httpMethod.toLowerCase() !== 'get') {
        return callback(null, NOT_FOUND_RESPONSE)
    }

    return callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/x-icon',
            'Cache-Control': `max-age=${TWO_MONTHS_IN_SECONDS}`,
        },
        body: faviconImg,
    })
}
