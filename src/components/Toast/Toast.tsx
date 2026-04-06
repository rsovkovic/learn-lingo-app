type Props = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        padding: "12px 14px",
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        maxWidth: 360,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ fontSize: 14, lineHeight: 1.3 }}>{message}</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
