import Layout from "./layout"
import DialogUseDemo from "./dialog-use-demo"
import { FixedTrigger } from "@/components/ui/dialog-chat/dialog-trigger"

export default function Page() {
  return (
    <Layout>
      <DialogUseDemo></DialogUseDemo>
      <FixedTrigger />
      <FixedTrigger triggerType="plain" offsetX={100} offsetY={100} />
    </Layout>
  )
}
