import React from "react";

export default function Error({ message }: { message: string }) {
  return <div style={{ padding: 15, fontSize: 16 }}>{message}</div>;
}
