import type Member from "@/models/member"
import Axios from "@/utils/axios"

interface CreateTokenReq {
  id: string
  password: string
}
interface CreateTokenRep {
  memberId: string
  alias?: string
  name: string
  section: string
  role: string
  profile?: string
  phone?: string
  qq?: string
  avatar?: string
  createdBy?: string
  gmtCreate: string
  gmtModified: string
  token: string
}

interface CreateMemberReq {
  memberId: string
  logtoId?: string
  name: string
  section: string
  alias?: string
  avatar?: string
  profile?: string
  phone?: string
  qq?: string
  role?: string
}

interface CreateMemberWithLogtoReq {
  memberId: string
  name: string
  section: string
  alias?: string
  avatar?: string
  profile?: string
  phone?: string
  qq?: string
}

interface ActivateMemberReq {
  password: string
  alias: string
  profile?: string
  phone: string
  qq: string
}
interface UpdateMemberBasicReq {
  memberId: string
  name?: string
  section?: string
  role?: string
}
const MemberService = {
  async createToken(req: CreateTokenReq) {
    const res = await Axios(
      "/members/" + req.id + "/token",
      {
        password: req.password,
      },
      "post"
    )
    return res as CreateTokenRep
  },
  async get() {
    const res = await Axios("/member", null, "get")
    return res as Member
  },
  async getByPage(offset: number, limit: number) {
    const res = await Axios("/members", { offset, limit }, "get")
    return res as Member[]
  },
  // this require admin role
  async getFullByPage(offset: number, limit: number) {
    const res = await Axios("/members/full", { offset, limit }, "get")
    return res as Member[]
  },
  async update(member: Member) {
    const res = await Axios("/member", member, "put")
    return res as Member
  },
  // this require admin role
  async updateBasic(req: UpdateMemberBasicReq) {
    const res = await Axios(
      `/members/${req.memberId}`,
      {
        name: req.name,
        section: req.section,
        role: req.role,
      },
      "patch"
    )
    return res as Member
  },
  async updateAvatar(url: string) {
    const res = await Axios("/member/avatar", { url }, "patch")
    return res as Member
  },
  async create(member: CreateMemberReq) {
    const res = await Axios(
      "/members/" + member.memberId,
      {
        name: member.name,
        section: member.section,
        role: "member",
      },
      "post"
    )
    return res as Member
  },
  async active(req: ActivateMemberReq) {
    const res = await Axios("/member/activate", req, "patch")
    return res as Member
  },
  async createWithLogto(token: string, member: CreateMemberWithLogtoReq) {
    return await window.fetch(`/api/members/${member.memberId}/logto`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(member),
    })
  },
  async createTokenViaLogtoToken(token: string) {
    return await window.fetch("/api/member/token/logto", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  },
}

export default MemberService
