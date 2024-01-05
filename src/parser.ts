function getClassCode(fullContent: string) {
  // 解析规则
  const LEFT = /\{/
  const RIGHT = /\}/
  const startRes = LEFT.exec(fullContent)
  const endRes = RIGHT.exec(fullContent)
  if (startRes && endRes) {
    // 将所有单行注释删除后，截取并返回
    return fullContent.replace(/\/\/.+/, '').slice(startRes.index + 1, endRes.index)
  }
  else {
    throw new Error('解析失败')
  }
}

function getItemArr(content: string) {
  const classCode = getClassCode(content)
  const ITEM_REG = /@Schema(.|\n)+?;/g
  const DOC_ITEM_REG = /\/\*\*(.|\n)+?;/g
  let temp = ITEM_REG.exec(classCode) || DOC_ITEM_REG.exec(classCode)
  const itemArr: string[] = []
  while (temp) {
    itemArr.push(temp[0].replace(/\s+/g, ' '))
    temp = ITEM_REG.exec(classCode) || DOC_ITEM_REG.exec(classCode)
  }
  return itemArr
}

function genJSON(propArr: string[]) {
  const obj: any = { type: 'object', properties: {} }
  for (const item of propArr) {
    const DESC_REG = /description\s*=\s*\".+\"/

    const DOC_REG = /\/\*\*(.|\n)+\*\//

    const propObj = {
      name: '',
      description: '',
      type: '',
    }
    const descRes = DESC_REG.exec(item)
    const docRes = DOC_REG.exec(item)
    if (descRes) {
      propObj.description = descRes[0].split('=').pop()!.replace(/(\"|\s)/g, '')
    } else if (docRes) {
      propObj.description = docRes[0].replace(/\/\*\*/g, '').replace(/\*\//g, '').trim().slice(1).trim()
    }

    const PROP_REG = /private.+;/
    const propRes = PROP_REG.exec(item)
    if (propRes) {
      const arr = propRes[0].split(' ')
      switch (arr[1]) {
        case 'Integer':
          propObj.type = 'integer'
          break
        case 'Double':
          propObj.type = 'number'
          break
        default:
          propObj.type = 'string'
      }
      propObj.name = arr.at(-1)!.replace(';', '')
    }
    else {
      throw new Error('解析错误')
    }
    obj.properties[propObj.name] = {
      type: propObj.type,
      description: propObj.description,
    }
  }

  return JSON.stringify(obj, null, 2)
}

export function parse(str: string) {
  try {
    const arr = getItemArr(str)
    return genJSON(arr)
  } catch { }
}
