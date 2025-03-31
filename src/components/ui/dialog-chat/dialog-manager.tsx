"use client"

import { DialogProps } from "@radix-ui/react-dialog"
import React from "react"
import { createRoot, Root } from "react-dom/client"
import DialogDemo from "./dialog-chat"

interface DialogOptions extends DialogProps {
  zIndex?: number
}

class DialogManager {
  private static instance: DialogManager
  private dialogs: Map<string, HTMLElement> = new Map()
  private dialogRoots: Map<string, Root> = new Map()
  private zIndex: number = 1000

  private constructor() {}

  static getInstance(): DialogManager {
    if (!DialogManager.instance) {
      DialogManager.instance = new DialogManager()
    }
    return DialogManager.instance
  }

  openDialog(options?: DialogOptions): string {
    if (options) {
      this.zIndex = options.zIndex || this.zIndex
    }
    this.zIndex++

    const wrap = document.createElement("div")
    wrap.className = "dialog-wrap"
    wrap.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${this.zIndex};
    `
    const root = createRoot(wrap)
    const id = Math.random().toString(36).substring(2, 9)
    root.render(
      <DialogDemo
        {...options}
        id={id}
        open={true}
        onOpenChange={(val) => {
          options?.onOpenChange?.(val)
          if (!val) {
            this.closeDialog(id)
          }
        }}
      />
    )
    document.body.appendChild(wrap)

    this.dialogs.set(id, wrap)
    this.dialogRoots.set(id, root)

    return id
  }

  closeDialog(id: string): void {
    const dialog = this.dialogs.get(id)
    const root = this.dialogRoots.get(id)

    if (root) {
      console.log(root)
      // root.unmount()
      // this.dialogRoots.delete(id)
    }

    if (dialog) {
      // dialog.remove()
      // this.dialogs.delete(id)
    }
  }

  closeAllDialogs(): void {
    this.dialogRoots.forEach((root) => root.unmount())
    this.dialogRoots.clear()

    this.dialogs.forEach((dialog) => dialog.remove())
    this.dialogs.clear()
  }
}

export const dialogManager = DialogManager.getInstance()

// 使用示例：
/*
// 在任何框架中使用：
import { dialogManager } from './dialog-manager'

// 打开一个简单的弹窗
const dialogId = dialogManager.openDialog({
  title: '提示',
  content: '这是一个测试弹窗',
  onConfirm: () => {
    console.log('用户点击了确认')
  },
  onClose: () => {
    console.log('用户点击了取消')
  }
})

// 打开一个带自定义内容的弹窗
const customContent = document.createElement('div')
customContent.innerHTML = '<p>这是自定义内容</p>'
const dialogId2 = dialogManager.openDialog({
  title: '自定义内容',
  content: customContent,
  confirmText: '确定',
  cancelText: '取消'
})

// 关闭特定弹窗
dialogManager.closeDialog(dialogId)

// 关闭所有弹窗
dialogManager.closeAllDialogs()
*/
