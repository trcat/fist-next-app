import { Button } from "@/components/ui/button"
import Layout from "./layout"
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

export default function DialogDemo({ open, onOpenChange }: DialogProps) {
  return (
    <Layout>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
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
    </Layout>
  )
}
