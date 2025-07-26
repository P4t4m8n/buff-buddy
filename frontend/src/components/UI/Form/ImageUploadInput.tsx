import {  useState } from 'react'
import Label from './Label'
import Input from './Input'
import type { ChangeEvent } from 'react'

interface ImageUploadInputProps {
  imgUrl?: string
}
export default function ImageUploadInput({ imgUrl }: ImageUploadInputProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    imgUrl || '/placeholder.svg',
  )



  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      console.error('No file selected')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  return (
    <Input
      type="file"
      hidden
      id="image"
      name="image"
      divStyle="h-full "
      onChange={handleImagePreview}
    >
      <Label htmlFor="image" className="cursor-pointer h-full w-full">
        <img
          src={imagePreview}
          width={32}
          height={32}
          alt="image-preview"
          className="h-full w-full aspect-square object-cover rounded"
        />
      </Label>
    </Input>
  )
}
