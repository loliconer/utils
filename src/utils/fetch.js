import errorCodes from './errorCodes'

const wrapFetch = function (request) {
  let status = 200
  return new Promise((resolve, reject) => {
    fetch(request).then(res => {
      if (res.ok) return res.json()
      status = res.status
      throw {
        status,
        msg: errorCodes[res.status] || res
      }
      // return res.text()
    }).then(body => {
      if (body.code === 0) {
        resolve(body.data === undefined ? 1 : body.data)
      } else {
        throw {
          status,
          code: body.code,
          msg: errorCodes[body.code] || body.msg || body.error || 'Unknown Error'
        }
      }
    }).catch(reject)
  })
}

let urlPrefix = '/api'
const headers = {}
const requestUrl = function (url) {
  if (url.startsWith('/') || url.startsWith('http')) return url
  return `${urlPrefix}/${url}`
}

export default {
  prefix(prefix) {
    urlPrefix = prefix
  },
  setHeader(key, value) {
    headers[key] = value
  },
  setErrorCodes(extra) {
    for (let key in extra) {
      if (extra.hasOwnProperty(key)) errorCodes[key] = extra[key]
    }
  },
  get(url) {
    return wrapFetch(new Request(requestUrl(url), {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        ...headers
      }
    }))
  },
  post(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(params)
    }))
  },
  form(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        ...headers
      },
      body: params
    }))
  },
  put(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(params)
    }))
  },
  putForm(url, params) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        ...headers
      },
      body: params
    }))
  },
  delete(url) {
    return wrapFetch(new Request(requestUrl(url), {
      method: 'delete',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        ...headers
      }
    }))
  }
}
