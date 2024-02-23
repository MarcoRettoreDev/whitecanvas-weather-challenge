import { FC } from "react";
import { MainBadge } from "./MainBadge";
import { DetailBar } from "./DetailBar";
import { InputSearchLocation } from "./InputSearchLocation";
import { LocationSelector } from "./LocationSelector";

export const CentralPanel: FC = () => {
  return (
    <div className="grid">
      <main className="grid__main">
        <InputSearchLocation />
        <LocationSelector />
        <MainBadge />
      </main>
      <aside className="grid__sidebar">
        <DetailBar />
      </aside>
    </div>
  );
};
