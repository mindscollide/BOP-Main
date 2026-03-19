import TransactionProvider from "@/context/BlotterTransactionContext";
import BlotterHeader from "./blotterHeader/BlotterHeader";

const Blotter = () => {
  return (
    <>
      <div className='row m-0 mt-3'>
        <div className='col-12 ps-1 pe-1 mb-2 col-blotter-table'>
          <section className='bg-white p-2'>
            <TransactionProvider>
              <BlotterHeader />
            </TransactionProvider>
          </section>
        </div>
      </div>
    </>
  );
};

export default Blotter;
