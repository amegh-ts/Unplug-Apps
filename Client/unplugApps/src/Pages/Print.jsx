import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { billClear } from "../Redux/BillDataRedux";

const Print = () => {
  const data = useSelector((state) => state.BillData.currentBill);
  const dispatch = useDispatch();

  if (!data || !data.allItems || !Array.isArray(data.allItems)) {
    return (
      <div className="bill-container">
        <p>Error: Bill data is not available.</p>
      </div>
    );
  }

  return (
    <div className="bill-container">
      <Link to={'/'}>
        <div className="back-button" onClick={() => dispatch(billClear())}>
          <button>
            <FaArrowAltCircleLeft />
          </button>
        </div>
      </Link>
      <h2>Bill Details</h2>
      <p className="bill-info">VR No: {data.vrNo}</p>
      <p className="bill-info">Name: {data.name}</p>
      <p className="bill-info">Date: {data.vrDate}</p>

      <table>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.allItems.map((item) => (
            <tr key={item.srNo}>
              <td>{item.itemCode}</td>
              <td>{item.itemName}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="total-label">
              Total Amount:
            </td>
            <td className="total-amount">{data.totalAmount}</td>
          </tr>
        </tfoot>
      </table>


    </div>
  );
};

export default Print;
