import { useBidOffer } from "@/context/BidOfferContext";
import styles from "./bidOfferStatus.module.css";

const BidOfferStatus = ({ activeValue }) => {
  const { isBid, isOffer, toggleStatus } = useBidOffer();

  return (
    <div className="d-flex align-items-center ms-1 gap-1">
      <button
        className={
          activeValue === 0
            ? styles.BidOfferButton_Disabled
            : isBid
              ? styles.BidOfferButton_Active
              : styles.BidOfferButton__Inactive
        }
        onClick={() => toggleStatus("isBid")}
      >
        Bid
      </button>

      <button
        className={
          activeValue === 0
            ? styles.BidOfferButton_Disabled
            : isOffer
              ? styles.BidOfferButton_Active
              : styles.BidOfferButton__Inactive
        }
        onClick={() => toggleStatus("isOffer")}
      >
        Offer
      </button>
    </div>
  );
};

export default BidOfferStatus;
