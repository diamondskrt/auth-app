import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/shared/ui/alert-dialog'

import { ConfirmProps } from '../model'

export function Confirm({
  open,
  title = 'You need to confirm the action',
  description,
  okText = 'Confirm',
  cancelText = 'Cancel',
  onOk,
  onCancel,
}: ConfirmProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOk?.()}>
            {okText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onCancel?.()}>
            {cancelText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
