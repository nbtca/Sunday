export const createTokenViaLogtoToken = async (token: string) => {
  return await window.fetch("/api/member/token/logto", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}
