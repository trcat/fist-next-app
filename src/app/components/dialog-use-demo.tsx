"use client"

import { Button } from "@/components/ui/button"
import { dialogManager } from "./dialog-manager"

export default function DialogUseDemo() {
  function handleClick() {
    dialogManager.openDialog({
      title: "提示",
      content: "这是一个测试弹窗",
      onConfirm: () => {
        console.log("用户点击了确认")
      },
    })
  }

  return (
    <>
      <Button onClick={handleClick}>点击打开弹窗</Button>
    </>
  )
}
