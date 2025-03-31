import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { DialogProps } from "@radix-ui/react-dialog"

interface DialogDemoProps extends DialogProps {
  id?: string
}

export default function DialogDemo({
  open,
  id,
  onOpenChange,
}: DialogDemoProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile[{id}]</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div>弹窗主体内容</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>关闭按钮</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
