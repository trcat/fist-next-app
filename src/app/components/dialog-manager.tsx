"use client"

import React from "react"
import { createRoot } from "react-dom/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface DialogOptions {
  title?: string
  content: string | HTMLElement
  onClose?: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
}

// React 组件
function DialogComponent({
  options,
  onClose,
}: {
  options: DialogOptions
  onClose: () => void
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{options.title || "提示"}</DialogTitle>
          <DialogDescription>
            {typeof options.content === "string" ? options.content : ""}
          </DialogDescription>
        </DialogHeader>
        {typeof options.content !== "string" && (
          <div
            ref={(el) => {
              if (el && options.content instanceof HTMLElement) {
                el.appendChild(options.content)
              }
            }}
          />
        )}
        <DialogFooter>
          {options.onConfirm && (
            <button
              onClick={() => {
                options.onConfirm?.()
                onClose()
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {options.confirmText || "确认"}
            </button>
          )}
          <DialogClose asChild>
            <button
              onClick={() => {
                options.onClose?.()
                onClose()
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {options.cancelText || "取消"}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Web Component 包装器
class DialogElement extends HTMLElement {
  private root: ReturnType<typeof createRoot> | null = null
  private options: DialogOptions | null = null

  connectedCallback() {
    this.root = createRoot(this)
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
  }

  setOptions(options: DialogOptions) {
    this.options = options
    this.render()
  }

  private render() {
    if (!this.root || !this.options) return

    this.root.render(
      <DialogComponent
        options={this.options}
        onClose={() => {
          this.remove()
        }}
      />
    )
  }
}

customElements.define("react-dialog", DialogElement)

class DialogManager {
  private static instance: DialogManager
  private dialogs: Map<string, HTMLElement> = new Map()
  private zIndex: number = 1000

  private constructor() {}

  static getInstance(): DialogManager {
    if (!DialogManager.instance) {
      DialogManager.instance = new DialogManager()
    }
    return DialogManager.instance
  }

  openDialog(options: DialogOptions): string {
    const dialogElement = document.createElement("react-dialog")
    const id = Math.random().toString(36).substring(2, 9)
    dialogElement.id = id
    dialogElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${this.zIndex++};
    `

    document.body.appendChild(dialogElement)
    ;(dialogElement as DialogElement).setOptions(options)
    this.dialogs.set(id, dialogElement)
    return id
  }

  closeDialog(id: string): void {
    const dialog = this.dialogs.get(id)
    if (dialog) {
      dialog.remove()
      this.dialogs.delete(id)
    }
  }

  closeAllDialogs(): void {
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
