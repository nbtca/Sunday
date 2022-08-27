import type Member from "@/models/member"
import Axios from "@/utils/axios"

interface CreateTokenReq {
  id: string
  password: string
}

const MemberService = {
  async createToken(req: CreateTokenReq): Promise<any> {
    return await Axios(
      "/members/" + req.id + "/token",
      {
        password: req.password,
      },
      "post"
    )
  },
  async get(): Promise<Member> {
    const res = await Axios("/member", null, "get")
    return res as Member
  },
  async getByPage(offset: number, limit: number) {
    const res = await Axios("/members", null, "get")
    return res as Member[]
  },
  async update(member:Member){
    const res = await Axios("/member", member, "put")
    return res as Member
  }
}

export default MemberService
