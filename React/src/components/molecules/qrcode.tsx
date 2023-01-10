// src/components/QrCode.js
import "./qrCode.css"
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {
  const [url, setUrl] = useState("./moin.png");
  const qrcode = (
    <QRCodeCanvas className="qrCode"
      id="qrCode"
      value={url}
      size={300}
      level={"H"}
    />
  );
  return (
    <div className="qrcode__container">
      <div className="qrCode">{qrcode}</div>
    </div>
  );
};

export default QrCode;