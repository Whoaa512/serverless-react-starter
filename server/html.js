import 'nodent-runtime'
import 'babel-polyfill'

import axios from 'axios'
import Promise from 'bluebird'
import urlJoin from 'url-join'
global.Promise = Promise

import errorHtml from 'raw-loader!./error.html'
import env from './lib/env'
import logger from './lib/logger'
import sharedConfig from '../config/shared'
import {
    NOT_FOUND_RESPONSE,
} from './lib/constants'

const isProduction = env.NODE_ENV === 'production'
const DEFAULT_HTML_HEADERS = {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'Content-Type': 'text/html',
}
const {
    DOCUMENT_TITLE,
    CLOUD_FRONT_BASE,
    LOCAL_ASSETS_BASE,
} = sharedConfig
const assetBase = isProduction ? CLOUD_FRONT_BASE : LOCAL_ASSETS_BASE
const manifestUrl = urlJoin(assetBase, 'asset-manifest.json')

const getData = ({ data }) => data

export default async function html(event, context, callback) {
    const httpMethod = event.httpMethod ? event.httpMethod : event.method
    if (httpMethod.toLowerCase() !== 'get') {
        return callback(null, NOT_FOUND_RESPONSE)
    }

    return Promise.try(async () => {
        const manifestJson = await axios.get(manifestUrl).then(getData)
        const cssPath = manifestJson['main.css']

        const css = urlJoin(assetBase, cssPath)
        const cssTag = cssPath ? `<link href="${css}" rel="stylesheet"/>` : ''
        const js = urlJoin(assetBase, manifestJson['main.js'])

        const html = `
        <!DOCTYPE html>
        <html lang="en" class="" >
            <head>
                <meta charset="utf-8">
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <title>${DOCUMENT_TITLE}</title>
                ${cssTag}
            </head>

            <body>
                <div id="root"></div>
                <script src="${js}"></script>
            </body>
        </html>`.trim()

        const response = {
            statusCode: 200,
            headers: DEFAULT_HTML_HEADERS,
            body: html,
        }

        // callback is sending HTML back
        return callback(null, response)
    })
    .catch((error) => {
        logger.error(error, 'Got an error')
        const response = {
            statusCode: 500,
            headers: DEFAULT_HTML_HEADERS,
            body: errorHtml,
        }

        // callback is sending HTML back
        return callback(null, response)
    })
}
