import { Helmet } from "react-helmet";
import useEnrolled from "../../../hooks/useEnrolled";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const PaymentHistory = () => {
  const [enrolled] = useEnrolled();

  // Sorting date
  const sortedEnrolled = [...enrolled].sort((payment1, payment2) => new Date(payment2.date) - new Date(payment1.date));
  // formatting date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <>
    <Helmet>
      <title>Pro-Learn || Payment History</title>
    </Helmet>
    <SectionTitle title="Payment History" />
    <div className="overflow-x-auto ">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Class name</th>
            <th>Transaction ID</th>
            <th>Payment Date</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {
            sortedEnrolled.map((paid, index) => <tr key={paid._id} className='w-full'>
              <td>
                {index + 1}
              </td>
              <td>
              {paid.name}
              </td>
              <td>
                {paid.transactionId}
              </td>
              <td>{formatDate(paid.date)}</td>
              <td>
                ${paid.price}
              </td>
              
            </tr>)
          }

        </tbody>
      </table>
    </div>
  </>
  );
};

export default PaymentHistory;
