import { FC } from "react";
import { MainBadge } from "./MainBadge";
import { DetailBar } from "./DetailBar";
import { InputSearchLocation } from "./InputSearchLocation";

export const CentralPanel: FC = () => {
  return (
    <div className="grid">
      <main className="grid__main">
        <InputSearchLocation />
        <MainBadge />
      </main>
      <aside className="grid__sidebar">
        <DetailBar />
      </aside>
    </div>
  );
};
