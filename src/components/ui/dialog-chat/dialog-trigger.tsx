"use client"

import {
  ComponentProps,
  RefObject,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react"
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableProps,
} from "react-draggable"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import DialogDemo from "./dialog-chat"

interface BaseButtonProps {
  text?: string
  icon?: React.ReactNode
}

interface TriggerButtonProps extends BaseButtonProps {
  collapse?: boolean
}

interface DraggableButtonProps
  extends ComponentProps<typeof Button>,
    TriggerButtonProps {
  draggableProps?: DraggableProps
  initPosition?: { top: string; left: string }
  zIndex?: number
  triggerType?: "collapse" | "plain"
  offsetX?: number
  offsetY?: number
}

export function CollapseButton({
  text = "AI 助理",
  icon,
  collapse = false,
}: TriggerButtonProps) {
  return (
    <div>
      {!collapse && (
        <div
          className="w-[32px] mx-[4px] mb-[4px] text-[14px] rounded-[22px]"
          style={{
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(270deg,#f3f3ff 0%,#ecf5ff 100%),linear-gradient(90deg,#0d7bff 0%,#a959ff 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
          }}
        >
          <div className="px-[8px] py-[5px]">{text}</div>
        </div>
      )}
      <div
        className="w-[40px] h-[40px] rounded-[22px] shadow-[0px 4px 8px rgba(13, 123, 255, 0.4)] flex items-center justify-center"
        style={{
          background: "linear-gradient(315deg,#a859ff 0%,#1385f0 100%)",
        }}
      >
        {icon || "x"}
      </div>
    </div>
  )
}

export function PlainButton({ text = "文本", icon }: BaseButtonProps) {
  return (
    <div className="plain-button flex items-center justify-center">
      <div className="plain-button__icon flex items-center justify-center">
        {icon || "x"}
      </div>
      <div className="plain-button__text">{text}</div>
    </div>
  )
}

export function FixedTrigger({
  className,
  draggableProps,
  initPosition,
  zIndex = 1000,
  triggerType = "collapse",
  offsetX = 20,
  offsetY = 20,
  ...props
}: DraggableButtonProps) {
  const [styleObj, setStyleObj] = useState<CSSProperties>()
  const [open, setOpen] = useState(false)

  const btnRef = useRef<HTMLDivElement>(null)
  const dragPosition = useRef<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    if (!btnRef.current) return
    const buttonHeight = btnRef.current.clientHeight
    const buttonWidth = btnRef.current.clientWidth

    setStyleObj({
      zIndex,
      top: `calc(100vh - ${buttonHeight}px - ${offsetY}px)`,
      left: `calc(100vw - ${buttonWidth}px - ${offsetX}px)`,
      ...initPosition,
    })
  }, [zIndex, initPosition, offsetX, offsetY])

  function handleStart(_: DraggableEvent, data: DraggableData) {
    dragPosition.current = {
      top: data.y,
      left: data.x,
    }
  }

  function handleStop(_: DraggableEvent, data: DraggableData) {
    const dragX = Math.abs(dragPosition.current.left - data.x)
    const dragY = Math.abs(dragPosition.current.top - data.y)
    if (dragX < 1 || dragY < 1) {
      console.log(`click with drag of ${dragX}, ${dragY}`)
      // onClick functionality here
      setOpen(true)
    }
  }

  return (
    <>
      <Draggable
        nodeRef={btnRef as RefObject<HTMLElement>}
        onStart={handleStart}
        onStop={handleStop}
        {...draggableProps}
      >
        <div
          ref={btnRef}
          className={cn("fixed cursor-move select-none", className)}
          style={styleObj}
        >
          {triggerType === "collapse" ? (
            <CollapseButton {...props} />
          ) : (
            <PlainButton {...props} />
          )}
        </div>
      </Draggable>
      <DialogDemo id={triggerType} open={open} onOpenChange={setOpen} />
    </>
  )
}
