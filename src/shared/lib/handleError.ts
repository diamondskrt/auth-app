import { toast } from 'sonner'

const handleError = (error?: Error) => {
  if (!error) return
  toast.error(error.message)
}

export { handleError }
