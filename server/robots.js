import {
    NOT_FOUND_RESPONSE,
    TWO_MONTHS_IN_SECONDS,
} from './lib/constants'

const robotsTxt = [
    'User-agent: *',
    'Allow: /*',
    '', // Include empty string to ensure there is a trailing newline
].join('\n')
export default function robots(event, context, callback) {
    const httpMethod = event.httpMethod ? event.httpMethod : event.method
    if (httpMethod.toLowerCase() !== 'get') {
        return callback(null, NOT_FOUND_RESPONSE)
    }

    return callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/text',
            'Cache-Control': `max-age=${TWO_MONTHS_IN_SECONDS}`,
        },
        body: robotsTxt,
    })
}
