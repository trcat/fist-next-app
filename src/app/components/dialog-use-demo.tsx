"use client"

import { Button } from "@/components/ui/button"
import { dialogManager } from "./dialog-manager"

export default function DialogUseDemo() {
  function handleClick() {
    dialogManager.openDialog()
  }
  return (
    <>
      <Button className="m-8" onClick={handleClick}>
        点击弹窗1
      </Button>
      <Button className="m-8" onClick={handleClick}>
        点击弹窗2
      </Button>
      <Button className="m-8" onClick={handleClick}>
        点击弹窗3
      </Button>
    </>
  )
}
