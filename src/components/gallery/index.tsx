import { Fragment, useCallback, useRef, useState } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { BeatLoader } from "react-spinners"
import ImageContainer from "../imageContainer"
import ImageTags from "../imageTags"

export interface ImagesData {
  data?: Pages | undefined
  isLoading: boolean
  hasNextPage?: boolean
  fetchNextPage: () => void
}
export interface Pages {
  pages: Page[]
}

export interface Page {
  data: { results: Image[] }
}

export interface Image {
  length: number
  id: string
  width: number
  height: number
  urls: { small: string; regular: string }
  tags: []
  description: string
}

const Gallery = (props: ImagesData) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = props

  const [isOpen, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState<Image>()

  const observer = useRef<IntersectionObserver>()

  const lastImg = useCallback(
    (node) => {
      if (isLoading || hasNextPage === false) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, hasNextPage]
  )

  const overlay = useRef(null)

  useOnClickOutside(overlay, () => setOpen(false))

  const handleModalOpen = (image: Image) => {
    setModalContent(image)
    setOpen(true)
  }

  if (isLoading === false && data === undefined) {
    return <div className='loader-container'>Brak wyników...</div>
  }
  if (isLoading || data === undefined) {
    return (
      <div className='loader-container'>
        <BeatLoader color={"#000"} loading={true} size={10} />
      </div>
    )
  }

  return (
    <>
      <div className='grid-wrapper'>
        {data.pages.map((page: Page, index: number) => {
          return (
            <Fragment key={index}>
              {page.data.results.map((image: Image, index: number) => {
                if (20 === index + 1) {
                  return (
                    <ImageContainer onClick={() => handleModalOpen(image)} key={image.id} image={image}>
                      <img ref={lastImg} src={image.urls.small} alt={image.description} />
                      <div className='tags'>
                        <ImageTags data={image} />
                      </div>
                    </ImageContainer>
                  )
                } else {
                  return (
                    <ImageContainer onClick={() => handleModalOpen(image)} key={image.id} image={image}>
                      <img src={image.urls.small} alt={image.description} />
                      <div className='tags'>
                        <ImageTags data={image} />
                      </div>
                    </ImageContainer>
                  )
                }
              })}
            </Fragment>
          )
        })}
      </div>
      {isOpen && (
        <div className='modal-overlay'>
          <div ref={overlay} className='modal'>
            <div className='modal-content'>
              <div className='modal-header'>
                <p>{modalContent?.description}</p>
              </div>
              <div className='modal-body'>
                <img src={modalContent?.urls.regular} alt={modalContent?.description}></img>
              </div>
              <div className='modal-footer'></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
