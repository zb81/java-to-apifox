import { message } from 'ant-design-vue'
import type { ClassBodyCtx, UnannClassTypeCtx, VariableDeclaratorIdCtx } from 'java-parser'

import {
  BaseJavaCstVisitorWithDefaults,
  parse as parseJava,
} from 'java-parser'
import { extractCommentText } from './utils'

// 后续在这里维护类型映射
const typeMapping: Record<string, string> = {
  String: 'string',
  Int: 'integer',
  Double: 'number',
  Integer: 'integer',
  List: 'array',
  Boolean: 'boolean',
}

interface Schema {
  field: string
  type: string
  comment: string
}

class JavaVisitor extends BaseJavaCstVisitorWithDefaults {
  schemas: Schema[]

  constructor() {
    super()
    this.schemas = []
    this.validateVisitor()
  }

  reset() {
    this.schemas = []
  }

  classBody(ctx: ClassBodyCtx) {
    const length = ctx.classBodyDeclaration?.length ?? 0
    this.schemas = Array.from({ length }).map(() => ({} as Schema))

    ctx.classBodyDeclaration?.forEach((node, idx) => {
      this.schemas[idx].comment = extractCommentText(node.leadingComments![0].image)
      this.classBodyDeclaration(node.children, { idx })
    })
  }

  variableDeclaratorId(ctx: VariableDeclaratorIdCtx, { idx }: { idx: number }) {
    this.schemas[idx].field = ctx.Identifier![0].image
  }

  unannClassType(ctx: UnannClassTypeCtx, { idx }: { idx: number }) {
    this.schemas[idx].type = typeMapping[ctx.Identifier[0].image]
  }
}

interface Result {
  type: 'object'
  properties: Record<string, { type: string, description: string }>
}

const visitor = new JavaVisitor()

export function parse(src: string) {
  visitor.reset()

  try {
    const cst = parseJava(src)
    visitor.visit(cst)
  }
  catch (e) {
    message.error('解析失败')
  }

  const ret: Result = { type: 'object', properties: {} }
  visitor.schemas.forEach((item) => {
    ret.properties[item.field] = {
      type: item.type,
      description: item.comment,
    }
  })

  return JSON.stringify(ret, null, 2)
}
