import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CredentialsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black-1 text-white">Free Credentials</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black-1 text-white">
        <DialogHeader>
          <DialogTitle>Try the app with these credentials:</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value="test@gmail.com" className="col-span-3 text-black-1"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" value="123456789" className="col-span-3 text-black-1"/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
