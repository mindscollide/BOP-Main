import React, { lazy, Suspense } from "react";
import BankForwards from "./bankForwards/BankForwards";

const Forwards = () => {
  const isDealerOrIsTreasury =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const TresmarkCrosses = isDealerOrIsTreasury
    ? lazy(() =>
        import("@/components/features/tresmarkCrosses/TresmarkCrosses")
      )
    : null;
  return (
    <>
      {" "}
      <Suspense fallback={<div>Loading table...</div>}>
        <BankForwards />

        <TresmarkCrosses />
      </Suspense>
    </>
  );
};

export default Forwards;
