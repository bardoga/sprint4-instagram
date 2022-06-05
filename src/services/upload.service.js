// export const uploadImg = async(ev) => {
//     const UPLOAD_PRESET = 'ypwxijpr'
//     const CLOUD_NAME = 'dq0zrm9wm'
//     const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
//     const FORM_DATA = new FormData();

//     FORM_DATA.append('file', ev.target.files[0])
//     FORM_DATA.append('upload_preset', UPLOAD_PRESET)
//     try {
//         const res = await fetch(UPLOAD_URL, {
//             method: 'POST',
//             body: FORM_DATA
//         })
//         const { url } = await res.json()
//         return url
//     } catch (err) {
//         console.error('ERROR!', err)
//     }
// }


export const uploadService = {
    uploadImg
}

function uploadImg(ev) {
    const CLOUD_NAME = "dq0zrm9wm"
    const UPLOAD_PRESET = "ypwxijpr"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('file', ev.target.files[0])

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}