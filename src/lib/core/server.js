const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';


export const serverFetch = async (path) => {
    const res = await fetch(`${ServerUrl}${path}`)
    return res.json()
}

export const serverMutation = async (path, data , method='POST') => {
    const res = await fetch(`${ServerUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return res.json()
}