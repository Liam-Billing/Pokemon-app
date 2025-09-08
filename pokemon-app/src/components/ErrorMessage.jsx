export default function ErrorMessage({ message }) {
  return (
    <div className="error" role="alert">
      {message}
    </div>
  )
}
