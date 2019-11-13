export default (data, filename, ext) => {
  const link = document.createElement('a')
  link.setAttribute('href', `data:text/${ext};charset=utf-8,\ufeff` + encodeURIComponent(data))
  link.setAttribute('download', `${filename}.${ext}`)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
