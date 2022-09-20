export default function Toast({ message }: { message: string }) {
  return <div className="toast-container">{message && <div className="toast">{message}</div>}</div>;
}
