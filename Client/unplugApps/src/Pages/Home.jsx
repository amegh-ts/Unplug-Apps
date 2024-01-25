import { useEffect, useState } from 'react'
import { billData } from '../apicalls';
import { useDispatch } from 'react-redux';
import { billClear, billDetail } from '../Redux/BillDataRedux';
import { Link } from 'react-router-dom';


const Home = () => {
    const [vrNo, setVrNo] = useState(Number);
    const [vrDate, setVrDate] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(Number);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 10);
        setVrDate(formattedDate);
    }, []);

    const [rows, setRows] = useState([
        { srNo: '', itemCode: '', itemName: '', qty: 0, rate: 0, total: 0 },
    ]);

    const handeleNewClick=()=>{
        dispatch(billClear())
        window.location.reload();

    }

    const handleRowChange = (index, field, value) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            newRows[index][field] = value;
            if (field === 'qty' || field === 'rate') {
                newRows[index].total = newRows[index].qty * newRows[index].rate;
            }
            return newRows;
        });
    };

    const handleInsertRow = () => {
        setRows((prevRows) => [...prevRows, { srNo: '', itemCode: '', itemName: '', qty: 0, rate: 0, total: 0 }]);
    };

    const handleDeleteRow = (index) => {
        setRows((prevRows) => {
            const newRows = [...prevRows];
            newRows.splice(index, 1);
            return newRows;
        });
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        if (!vrNo || !vrDate || !name || rows.some(row => !row.srNo || !row.itemCode || !row.itemName || row.qty === 0 || row.rate === 0)) {
            alert('Please fill in all required fields before saving.');
            return;
        }
        const allItems = rows.map((row) => ({ ...row }));
        const totalAmount = rows.reduce((sum, row) => sum + row.total, 0);
        setAmount(totalAmount)
        setData({vrNo,vrDate,name,amount,allItems,totalAmount})
        dispatch(billDetail({vrNo,vrDate,name,allItems,totalAmount}))
        billData({vrNo,vrDate,name,totalAmount,allItems})
    };

    console.log(data);


    return (
        <div className="Home_Main">
            <div className="container">
                <div className="cleft">
                    <div className="c_header">
                        <div className="title">
                            <h2>Header</h2>
                        </div>
                        <div className="ch_top">
                            <span>
                                <h3>Vr No</h3>
                                <input type="text" placeholder='Enter voucher no' value={vrNo} onChange={(e) => { setVrNo(e.target.value) }} />
                            </span>
                            <span>
                                <h3>Vr Date</h3>
                                <input type="date" placeholder="" value={vrDate} onChange={(e) => setVrDate(e.target.value)} />
                            </span>
                            <span>
                                <h3>Status</h3>
                                <button>OK</button>
                            </span>
                        </div>
                        <div className="ch_bottom">
                            <span>
                                <h3>A/C Name</h3>
                                <input type="text" className='acname' placeholder='Enter Customer name' value={name} onChange={(e) => setName(e.target.value)}/>
                            </span>
                            <span>
                                <h3>Amount</h3>
                                <input type="text" placeholder='Total Amount' value={amount}/>
                            </span>
                        </div>
                    </div>

                    <div className="c_contents">
                        <div className="title">
                            <h2>Contents</h2>
                        </div>
                        <div className="c_table">
                            <table className="detailTable">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Item Code</th>
                                        <th>Item Name</th>
                                        <th>Qty</th>
                                        <th>Rate</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td><input type="number" value={row.srNo} onChange={(e) => handleRowChange(index, 'srNo', e.target.value)} /></td>
                                            <td><input type="text" value={row.itemCode} onChange={(e) => handleRowChange(index, 'itemCode', e.target.value)} /></td>
                                            <td><input type="text" value={row.itemName} onChange={(e) => handleRowChange(index, 'itemName', e.target.value)} /></td>
                                            <td><input type="number" value={row.qty} onChange={(e) => handleRowChange(index, 'qty', e.target.value)} /></td>
                                            <td><input type="number" value={row.rate} onChange={(e) => handleRowChange(index, 'rate', e.target.value)} /></td>
                                            <td>{row.total}</td>
                                            <td><button onClick={() => handleDeleteRow(index)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="cright">
                    <div className="cr_container">
                        <button onClick={handeleNewClick}>New</button>
                        <button onClick={handleInsertRow}>Insert</button>
                        <button onClick={handleSaveClick}>Save</button>
                        <Link to={'/print'}><button>Print</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home