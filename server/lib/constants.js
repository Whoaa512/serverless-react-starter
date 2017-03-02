export const NOT_FOUND_RESPONSE = {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' }),
}

export const TWO_MONTHS_IN_SECONDS = 60 * 24 * 60 * 60
