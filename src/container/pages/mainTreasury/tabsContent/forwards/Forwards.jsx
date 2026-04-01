import React, { lazy, Suspense } from "react";
import BankForwards from "./bankForwards/BankForwards";
import SectionLoader from "@/components/common/loader/SectionLoader";

const Forwards = () => {
  const isDealerOrIsTreasury =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const TresmarkCrosses = isDealerOrIsTreasury
    ? lazy(() =>
        import("@/components/features/tresmarkCrosses/TresmarkCrosses")
      )
    : null;

  const BankForwards = isDealerOrIsTreasury
    ? lazy(() =>
        import(
          "@/container/pages/mainTreasury/tabsContent/forwards/bankForwards/BankForwards"
        )
      )
    : null;
  return (
    <>
      {" "}
      <Suspense fallback={<SectionLoader />}>
        <BankForwards />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TresmarkCrosses />
      </Suspense>
    </>
  );
};

export default Forwards;
