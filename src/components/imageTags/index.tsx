export interface TagsObject {
  data: Tags
}
export interface Tags {
  tags: Tag[]
}

export interface Tag {
  type: string
  title: string
}

const ImageTags = (props: TagsObject) => {
  const { data } = props

  if (data.tags.length === 0) {
    return <span className='tag-placeholder'></span>
  }

  return (
    <>
      {data?.tags.map((item: Tag, index: React.Key) => {
        return (
          <span className='tag' key={index}>
            {item.title}
          </span>
        )
      })}
    </>
  )
}
export default ImageTags
