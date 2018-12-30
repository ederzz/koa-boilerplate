interface IMimeCollections {
    imgType: Array<string>,
    musicType: Array<string>
}

// mime type
export const mimeCollections: IMimeCollections = {
    imgType: [
        'image/svg+xml',
        'image/jpeg',
        'image/x-icon',
        'image/gif',
        'image/png',
        'image/bmp', 
        'image/webp', 
        'image/vnd.microsoft.icon'
    ],
    musicType: [
        'audio/midi', 
        'audio/mpeg', 
        'audio/webm', 
        'audio/ogg', 
        'audio/wav',
        'audio/flac'
    ]
}
