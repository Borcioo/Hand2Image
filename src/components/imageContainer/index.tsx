import { useEffect, useState } from "react"

interface ImageObject {
  onClick: React.MouseEventHandler<HTMLDivElement>
  image: { width: number; height: number }
  children: React.ReactNode
}

const ImageContainer = (props: ImageObject) => {
  const { image, children, onClick } = props
  const [imgSize, setImgSize] = useState("")
  const width = image.width
  const height = image.height

  useEffect(() => {
    if (width / height >= 0.8 && width / height <= 1.77) {
      setImgSize("wide")
    } else if (height / width >= 0.8 && width / width <= 1.77) {
      setImgSize("tall")
    } else {
      let random = Math.floor(Math.random() * 10) + 1
      if (random <= 8) {
        setImgSize("small")
      } else {
        setImgSize("big")
      }
    }
  }, [height, image, width])

  return (
    <div onClick={onClick} className={imgSize}>
      {children}
    </div>
  )
}

export default ImageContainer
