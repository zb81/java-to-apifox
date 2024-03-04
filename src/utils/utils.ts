const commentReg = /\/\*(([^*]|\*(?!\/))*)\*\//
const spaceReg = /(\s+)|[\s\*\n]/g

export function extractCommentText(comment: string) {
  const res = commentReg.exec(comment)
  if (!res)
    throw new Error(`parse comment error: ${comment}`)

  return res[1].split('\n').map(line => line.replace(spaceReg, ' ').trim()).filter(Boolean).join(' ')
}
