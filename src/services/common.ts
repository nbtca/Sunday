import Axios from "@/utils/axios"

interface FileUploadResponse {
  url: string
}

const CommonService = {
  async upload(file: File) {
    const param = new FormData()
    param.append("file", file)
    const res = await Axios("/upload", param, "post")
    return res as FileUploadResponse
  },
}

export default CommonService
