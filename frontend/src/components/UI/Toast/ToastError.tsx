interface ToastProps {
  error: string;
}
export default function ToastError({ error }: ToastProps) {
  return (
    <span className="text-black-900 bg-error-red w-fit block text-center px-2 py-4 rounded border-4 border-main-orange ">
      {error}
    </span>
  );
}
