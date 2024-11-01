type ConfirmProps = {
  open: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  description?: string
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel?: () => void
}

export type { ConfirmProps }
